import { User } from '../../entity/User';
import { createMiddleware } from '../../utils/createMiddleware';
import { ResolverMap } from '../../utils/interface';
import middleware from './middleware';

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { session }) => {
      return User.findOne({ where: { id: session.userId } });
    }),
  },
};
