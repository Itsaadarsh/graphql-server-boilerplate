import { GQL } from "../../types/schema"

interface ResolverMap {
  [key: string]: {
    [key: string]: (parent:any,args: any, context: {}, info:any) => any
  }
}

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }:GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'} Mofos!`,
  }
}