import axios from "axios";
import { User } from "../../entity/User";
import { createTypeormCon } from "../../utils/createTypeORMCon";

let userId: string;
const {email,password} = {email: "aadi@aadi.com", password: "123456"}

beforeAll(async () => {
  await createTypeormCon();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

const loginMutation = (testEmail: string,testPass: string) =>  `
    mutation {
        login(email: "${testEmail}", password: "${testPass}"){path message}
    }
`

const meQuery = `
{
  me {
    id
    email
  }
}
`;

describe("me", () => {
  test("get current user", async () => {
    await axios.post(
      process.env.TEST_HOST as string,
      {
        query: loginMutation(email, password)
      },
      {
        withCredentials: true
      }
    );

    const response = await axios.post(
      process.env.TEST_HOST as string,
      {
        query: meQuery
      },
      {
        withCredentials: true
      }
    );
    expect(response.data.data).toEqual({
      me: {
        id: userId,
        email
      }
    });
  });
});