import { request } from "graphql-request";
import { createTypeormCon } from "../../utils/createTypeORMCon";

beforeAll(async() => {
    await createTypeormCon()
    await request(process.env.TEST_HOST!,registerMutation(email,password))
})

const {email,password} = {email: "aadi@aadi.com", password: "123456"}

const loginMutation = (testEmail: string,testPass: string) =>  `
    mutation {
        login(email: "${testEmail}", password: "${testPass}"){path message}
    }
`

const registerMutation = (testEmail: string,testPass: string) =>  `
    mutation {
        register(email: "${testEmail}", password: "${testPass}"){path message}
    }
`

describe("Login tests", () => {
    test("Successful login", async () => {
        const req1 = await request(process.env.TEST_HOST!,loginMutation(email,password))
        expect(req1.login).toHaveLength(1)
        expect(req1.login[0].message).toEqual('Please confirm your email!')
    })
})