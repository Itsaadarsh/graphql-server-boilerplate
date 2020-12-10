import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { createTypeormCon } from '../../utils/createTypeORMCon';
import { TestClient } from '../../utils/testClient';

let userId: string;
const { email, password } = { email: 'aadi1@aadi.com', password: '123456' };

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

describe('me', () => {
  test('user not authenticated', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const res = await classTest.me();
    expect(res.data.me).toBeNull();
  });

  test('get authenticated user', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);

    await classTest.login(email, password);

    const response = await classTest.me();

    expect(response.data).toEqual({
      me: {
        id: userId,
        email,
      },
    });
  });
});
