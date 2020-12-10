import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { createTypeormCon } from '../../utils/createTypeORMCon';
import { TestClient } from '../../utils/testClient';

beforeAll(async () => {
  await createTypeormCon();
});

afterAll(async () => {
  await getConnection().close();
});

const { email, password } = { email: 'aadi@aadi.com', password: 'q12312312w' };

describe('Register Test', () => {
  test('add one user to db', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req1 = await classTest.register(email, password);
    expect(req1.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });
  test('check for duplicate value', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req2 = await classTest.register(email, password);
    expect(req2.data.register).toHaveLength(1);
    expect(req2.data.register[0].path).toEqual('email');
  });
  test('test validation system', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req3 = await classTest.register('1', password);
    expect(req3.data.register).toHaveLength(2);
  });
});
