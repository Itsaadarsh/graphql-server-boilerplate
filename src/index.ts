import "reflect-metadata";
import * as fs from 'fs'
import * as path from 'path'
import { GraphQLServer } from 'graphql-yoga'
import { createTypeormCon } from "./utils/createTypeORMCon";
import { GraphQLSchema } from "graphql";
import { importSchema } from "graphql-import";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { confEmailRoute } from "./routes/confEmail";
import { redis } from "./redisInstance";

const schemas: GraphQLSchema[] = []
const folders = fs.readdirSync(path.join(__dirname,'./modules'))
folders.forEach(folder => {
    const {resolvers} =  require(`./modules/${folder}/resolvers`)
    const typeDefs = importSchema(path.join(__dirname, `./modules/${folder}/schema.graphql`));
    schemas.push(makeExecutableSchema({resolvers,typeDefs}))  
})

const schema: any= mergeSchemas({schemas})
const server = new GraphQLServer({schema,context: ({request}) => ({
    redis,
    url: request.protocol + '://' + request.get("host")
} )})

server.express.get('/confirm/:id', confEmailRoute)

const gettingStarted = async () => {
    await createTypeormCon();
    await server.start();
    console.log('Server is running on localhost:4000')
}

gettingStarted()
