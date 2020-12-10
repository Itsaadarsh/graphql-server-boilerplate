import { Resolver } from '../../utils/interface';

export default async (resolver: Resolver, parent: any, args: any, context: any, info: any) => {
  const res = await resolver(parent, args, context, info);
  return res;
};
