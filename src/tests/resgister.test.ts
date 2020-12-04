import { request } from "graphql-request";
import { getConnection } from "typeorm";
import { User } from "../entity/User";
import { createTypeormCon } from "../utils/createTypeORMCon";

beforeAll(async() => {
    await createTypeormCon();
})

afterAll(async() => {
  await getConnection().close()
})

const {email,password} = {email: "aadi@aadi.com", password: "lololololololol"}
const host: string = 'http://localhost:4000/'
const mutation = `
    mutation {
        register(email: "${email}", password: "${password}")
    }
`

test("Register test", async () => {
    const res = await request(host, mutation)
    expect(res).toEqual({register: true})
    const users = await User.find({where: {email}})
    expect(users).toHaveLength(1)
    const user = users[0]
    expect(user.email).toEqual(email)
    expect(user.password).not.toEqual(password)
})