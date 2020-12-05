import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { createTypeormCon } from "./utils/createTypeORMCon";
import { GraphQLSchema } from "graphql";
import * as fs from 'fs'
import * as path from 'path'
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import * as Redis from 'ioredis'
import { User } from "./entity/User";

export const startServer = async () => {
    const schemas: GraphQLSchema[] = []
    const folders = fs.readdirSync(path.join(__dirname,'./modules'))
    folders.forEach(folder => {
        const {resolvers} =  require(`./modules/${folder}/resolvers`)
        const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));
        schemas.push(makeExecutableSchema({resolvers,typeDefs}))  
    })
    
    const redis = new Redis()
    const schema: any= mergeSchemas({schemas})
    const server = new GraphQLServer({schema,context: ({request}) => ({
        redis,
        url: request.protocol + '://' + request.get("host")
    } )})

    server.express.get('/confirm/:id',async (req,res) => {
        const {id} = req.params
        const userId = await redis.get(id)
        if(userId){
            await User.update({id:userId},{confirmed:true})
            res.send('Confirmed')
        }
        else{
            res.send('Somthing went wrong!')
        }
    })

    await createTypeormCon();
    await server.start();
    console.log('Server is running on localhost:4000')
}


startServer()