import { request } from "graphql-request";
import { getConnection } from "typeorm";
import { User } from "../../entity/User";
import { createTypeormCon } from "../../utils/createTypeORMCon";

beforeAll(async() => {
    await createTypeormCon();
})

afterAll(async() => {
  await getConnection().close()
})

const {email,password} = {email: "aadi@aadi.com", password: "q12312312w"}

const host: string = 'http://localhost:4000/'

const mutation = (testEmail: string,testPass: string) =>  `
    mutation {
        register(email: "${testEmail}", password: "${testPass}"){path}
    }
`

test("Register test", async () => {

    // test to add user to db
    const req1 = await request(host, mutation(email,password))
    expect(req1).toEqual({register: null})
    const users = await User.find({where: {email}})
    expect(users).toHaveLength(1)
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)

    // test to check for duplicate email's
    const req2 = await request(host, mutation(email,password))
    expect(req2.register).toHaveLength(1);
    expect(req2.register[0].path).toEqual('email');
    
    // test the validatiom
    const req3 = await request(host, mutation('1',password))
    expect(req3.register).toHaveLength(2)

})