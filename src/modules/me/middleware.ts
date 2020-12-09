import { Middleware, Resolver } from "../../utils/interface";

export default async(resolver:Resolver,parent:any,args:any,context:any,info:any) => {
    const res = await resolver(parent,args,context,info)
    return res
}

export const createMiddleware = (middleware:Middleware,resolverFunc:Resolver) => (parent:any,args:any,context:any ,info:any) => {
    return middleware(resolverFunc,parent,args,context,info)
}