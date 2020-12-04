import "reflect-metadata";
import { GraphQLServer } from 'graphql-yoga'
import { resolvers } from "./resolver";
import { createTypeormCon } from "./utils/createTypeORMCon";


const server = new GraphQLServer({ typeDefs: 'src/schema.graphql',  resolvers })

export const startServer = async () => {
    await createTypeormCon();
    await server.start();
    console.log('Server is running on localhost:4000')
}

startServer()