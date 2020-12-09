import axios from 'axios';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { createTypeormCon } from '../../utils/createTypeORMCon';

let userId: string;
const { email, password } = { email: 'aadi@aadi.com', password: '123456' };

beforeAll(async () => {
  await createTypeormCon();
  const user = await User.create({
    email,
    password,
    confirmed: true,
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await getConnection().close();
});

const loginMutation = (testEmail: string, testPass: string) => `
    mutation {
        login(email: "${testEmail}", password: "${testPass}"){path message}
    }
`;

const meQuery = `
{
  me {
    id
    email
  }
}
`;

const logoutMutation = `
    mutation {
        logout
    }
`;

describe('logout ', () => {
  test('logout user', async () => {
    await axios.post(
      process.env.TEST_HOST as string,
      { query: loginMutation(email, password) },
      { withCredentials: true }
    );

    const response = await axios.post(
      process.env.TEST_HOST as string,
      { query: meQuery },
      { withCredentials: true }
    );

    expect(response.data.data).toEqual({
      me: {
        id: userId,
        email,
      },
    });

    await axios.post(process.env.TEST_HOST!, { query: logoutMutation }, { withCredentials: true });
    const res = await axios.post(
      process.env.TEST_HOST as string,
      { query: meQuery },
      { withCredentials: true }
    );
    expect(res.data.data).toBeNull();
  });
});
