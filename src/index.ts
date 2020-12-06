import "reflect-metadata";
import * as fs from 'fs'
import * as path from 'path'
import * as Redis from 'ioredis'
import { GraphQLServer } from 'graphql-yoga'
import { createTypeormCon } from "./utils/createTypeORMCon";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { User } from "./entity/User";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";

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
            await redis.del(id)
            res.send('Confirmed')
        }
        else{
            res.send('Something went wrong!')
        }
    })

    await createTypeormCon();
    await server.start();
    console.log('Server is running on localhost:4000')
}


startServer()