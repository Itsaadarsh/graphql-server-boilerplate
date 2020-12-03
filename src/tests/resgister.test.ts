import { request } from "graphql-request";

const {email,password} = {email: "aadi@aadi.1com", password: "lololololololol"}
const host: string = 'http://localhost:4000/'
const mutation = `
    mutation {
        register(email: "${email}", password: "${password}")
    }
`

test("Register test", async () => {
    const res = await request(host, mutation)
    expect(res).toEqual({register: true})
})