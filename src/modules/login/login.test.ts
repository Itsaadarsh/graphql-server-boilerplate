import { request } from "graphql-request";
import { User } from "../../entity/User";
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
    
    test("Invalid email login", async () => {
        const req = await request(process.env.TEST_HOST!,loginMutation('bad@email.com',password))
        expect(req.login).toHaveLength(1)
        expect(req.login[0].message).toEqual('Invalid login! Try again.')
    })
    
    test("Invalid password login", async () => {
        const req = await request(process.env.TEST_HOST!,loginMutation(email,'lololol'))
        expect(req.login).toHaveLength(1)
        expect(req.login[0].message).toEqual('Invalid login! Try again.')
    })

    test("Confirm email", async () => {
        const req = await request(process.env.TEST_HOST!,loginMutation(email,password))
        expect(req.login).toHaveLength(1)
        expect(req.login[0].message).toEqual('Please confirm your email!')
    })
    
    test("Successful login", async () => {
        User.update({email},{confirmed:true})
        const req = await request(process.env.TEST_HOST!,loginMutation(email,password))
        expect(req.login).toBeNull()
    })
})