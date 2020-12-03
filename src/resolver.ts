interface ResolverMap {
  [key: string]: {
    [key: string]: (parent:any,args: any, context: {}, info:any) => any
  }
}

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }:GQL.IHelloOnQueryArguments) => `Hello ${name || 'World'} Mofos!`,
  },
  Mutation: {
    register: (_, {email,password}: GQL.IRegisterOnMutationArguments) => {return email || password}
  }
}
