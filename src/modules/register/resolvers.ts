import * as yup from 'yup';
import { GQL } from '../../types/schema';
import { User } from '../../entity/User';
import { yupErrorHandling } from '../../utils/yupErrorHanding';
import { Redis } from 'ioredis';
import { confEmailLink } from '../../utils/confEmailLink';
// import { sendEmail } from '../../utils/sendEmail';

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(6).max(255),
});

interface ResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: { redis: Redis; url: string }, info: any) => any;
  };
}

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (_, args: GQL.IRegisterOnMutationArguments, { redis, url }) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (err) {
        return yupErrorHandling(err);
      }

      const { email, password } = args;
      const findUser = await User.findOne({ where: { email }, select: ['id'] });
      if (findUser) {
        return [
          {
            path: 'email',
            message: 'Email Already Taken!',
          },
        ];
      }
      const user = await User.create({ email, password });
      await user.save();
      // sendEmail(email,await confEmailLink(url,user.id,redis))
      confEmailLink(url, user.id, redis);
      return null;
    },
  },
};
