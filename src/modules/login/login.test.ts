import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { createTypeormCon } from '../../utils/createTypeORMCon';
import { TestClient } from '../../utils/testClient';

beforeAll(async () => {
  await createTypeormCon();
  const classTest = new TestClient(process.env.TEST_HOST!);
  await classTest.register(email, password);
});

afterAll(async () => {
  await getConnection().close();
});

const { email, password } = { email: 'aadi@aadi.com', password: '123456' };

describe('Login tests', () => {
  test('Invalid email login', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req = await classTest.login('asdasd', password);
    expect(req.data.login).toHaveLength(1);
    expect(req.data.login[0].message).toEqual('Invalid login! Try again.');
  });

  test('Invalid password login', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req = await classTest.login(email, 'asdasdasd');
    expect(req.data.login).toHaveLength(1);
    expect(req.data.login[0].message).toEqual('Invalid login! Try again.');
  });

  test('Confirm email', async () => {
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req = await classTest.login(email, password);
    expect(req.data.login).toHaveLength(1);
    expect(req.data.login[0].message).toEqual('Please confirm your email!');
  });

  test('Successful login', async () => {
    await User.update({ email }, { confirmed: true });
    const classTest = new TestClient(process.env.TEST_HOST!);
    const req = await classTest.login(email, password);
    expect(req.data.login).toBeNull();
  });
});
