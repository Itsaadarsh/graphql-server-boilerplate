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

const {email,password} = {email: "aadi@aadi.1com", password: "lololololololol"}
const host: string = 'http://localhost:4000/'
const mutation = `
    mutation {
        register(email: "${email}", password: "${password}"){path}
    }
`

test("Register test", async () => {
    const req1 = await request(host, mutation)
    expect(req1).toEqual({register: null})
    const users = await User.find({where: {email}})
    expect(users).toHaveLength(1)
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)
    const req2 = await request(host, mutation)
    expect(req2.register).toHaveLength(1);
    expect(req2.register[0].path).toEqual('email');
})