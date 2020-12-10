import { Middleware, Resolver } from './interface';

export const createMiddleware = (middlewareFunc: Middleware, resolverFunc: Resolver) => async (
  parent: any,
  args: any,
  context: any,
  info: any
) => await middlewareFunc(resolverFunc, parent, args, context, info);
