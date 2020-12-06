import fetch from "node-fetch";
import { confEmailLink } from "./confEmailLink";
import { createTypeormCon } from "./createTypeORMCon";
import { User } from "../entity/User";
import { getConnection } from "typeorm";
import { redis } from '../redisInstance';

let userId: string;
let test2Url:string; 

beforeAll(async() => {
    await createTypeormCon()
    const user = await User.create({
        email: 'dummy@xyz.com',
        password: 'akjdhakjsdhakljd'
    }).save()
    userId = user.id
    process.env.TEST_HOST = 'http://localhost:4000'
})

afterAll(async() => {
    await getConnection().close()
})
describe("Testing email confirmation", () => {
    
    test("Getting email confirmation", async() => {
        const url = await confEmailLink(process.env.TEST_HOST!, userId, redis)
        test2Url = url
        const res = await fetch(url)
        const resText = await res.text()
        expect(resText).toEqual('Confirmed')
        const isUserConf = await User.findOne({where: {id: userId}})
        expect(isUserConf!.confirmed).toBeTruthy();
    })

    test("Removing redis key after conformation", async() => {
        const urlSplit = test2Url.split('/')
        const redisKey = urlSplit[urlSplit.length - 1]
        const isKey = await redis.get(redisKey)
        expect(isKey).toBeNull();
    })

    test('Testing with invalid redis id',async() => {
        const res = await fetch(`${process.env.TEST_HOST}/confirm/23123`)
        const resText = await res.text()
        expect(resText).toEqual('Something went wrong!')
    })
})