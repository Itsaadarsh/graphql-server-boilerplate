import { Middleware, Resolver } from './interface';

export const createMiddleware = (middlewareFunc: Middleware, resolverFunc: Resolver) => (
  parent: any,
  args: any,
  context: any,
  info: any
) => middlewareFunc(resolverFunc, parent, args, context, info);
