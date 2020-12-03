import { GQL } from "./types/schema"
import * as bcrypt from "bcrypt"
import { User } from "./entity/User";

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
    register: async(_, {email,password}: GQL.IRegisterOnMutationArguments) => {
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({email, password: hash})
      await user.save()
      return true
    }
  }
}
