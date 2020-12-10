import { ResolverMap } from '../../utils/interface';

export const resolvers: ResolverMap = {
  Mutation: {
    logout: (_, __, { session }) => {
      if (session.userId) {
        new Promise(res =>
          session.destroy(err => {
            if (err) console.log(err);
            res(true);
          })
        );
        return true;
      } else {
        return false;
      }
    },
  },
};
