import { request } from 'graphql-request';
import { getConnection } from 'typeorm';
import { User } from '../../entity/User';
import { createTypeormCon } from '../../utils/createTypeORMCon';

beforeAll(async () => {
  await createTypeormCon();
});

afterAll(async () => {
  await getConnection().close();
});

const { email, password } = { email: 'aadi@aadi.com', password: 'q12312312w' };

const mutation = (testEmail: string, testPass: string) => `
    mutation {
        register(email: "${testEmail}", password: "${testPass}"){path}
    }
`;
describe('Register Test', () => {
  it('add one user to db', async () => {
    const req1 = await request(process.env.TEST_HOST!, mutation(email, password));
    expect(req1).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });
  it('check for duplicate value', async () => {
    const req2 = await request(process.env.TEST_HOST!, mutation(email, password));
    expect(req2.register).toHaveLength(1);
    expect(req2.register[0].path).toEqual('email');
  });
  it('test validation system', async () => {
    const req3 = await request(process.env.TEST_HOST!, mutation('1', password));
    expect(req3.register).toHaveLength(2);
  });
});
