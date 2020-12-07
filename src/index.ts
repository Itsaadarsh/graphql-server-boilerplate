import "reflect-metadata";
import "dotenv/config"
import * as Redis from 'redis'
import * as session from "express-session";
import * as connectRedis from "connect-redis";
import { confEmailRoute } from "./routes/confEmail";
import { GraphQLServer } from 'graphql-yoga'
import { createTypeormCon } from "./utils/createTypeORMCon";
import { redis } from "./utils/redisInstance";
import { genSchema } from "./utils/genSchema";

const schema: any=  genSchema()
const server = new GraphQLServer({schema,context: ({request}) => ({
    redis,
    url: request.protocol + '://' + request.get("host"),
    session: request.session
} )})

const SESSION_SECRET = 'asdasd'
const redisStore = connectRedis(session)
const redisCLient = Redis.createClient()

server.express.use(session({
    store: new redisStore({client:redisCLient }),
    name:"lid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000*60*60*24*7
    }
}))

const cors = {
    credentials: true,
    origin: 'https://localhost:6969'
}

server.express.get('/confirm/:id', confEmailRoute)

const gettingStarted = async () => {
    await createTypeormCon();
    await server.start({cors});
    console.log('Server is running on localhost:4000')
}

gettingStarted()
