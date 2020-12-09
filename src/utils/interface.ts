import { Session } from 'express-session';
import { Redis } from 'ioredis';

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface Resolver {
  (parent: any, args: any, context: { redis: Redis; url: string; session: SESSION }, info: any): any;
}
export interface Middleware {
  (
    resolver: Resolver,
    parent: any,
    args: any,
    context: { redis: Redis; url: string; session: SESSION },
    info: any
  ): any;
}

export interface SESSION extends Session {
  userId?: string;
}
