import { Resolver } from '../../utils/interface';

export default async (resolver: Resolver, parent: any, args: any, context: any, info: any) => {
  return resolver(parent, args, context, info);
};
