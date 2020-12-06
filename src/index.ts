import "reflect-metadata";
import { confEmailRoute } from "./routes/confEmail";
import { GraphQLServer } from 'graphql-yoga'
import { createTypeormCon } from "./utils/createTypeORMCon";
import { redis } from "./redisInstance";
import { genSchema } from "./utils/genSchema";

const schema: any=  genSchema()
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
