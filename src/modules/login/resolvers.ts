import * as bcrypt from 'bcrypt'
import { GQL } from "../../types/schema"
import { Redis } from 'ioredis';
import { User } from "../../entity/User";

interface ResolverMap {
  [key: string]: {
    [key: string]: (parent:any,args: any, context: {redis:Redis, url: string}, info:any) => any
  }
}

export const resolvers: ResolverMap = {
  Mutation: {
    login: async(_, {email,password}: GQL.ILoginOnMutationArguments) => {
      const user = await User.findOne({where: {email}})

      if(!user){
        return [{
          path: 'email',
          message: 'Invalid login! Try again.'
        }]
      }

      const isValid = await bcrypt.compare(password,user?.password)
      if(!isValid){
        return [{
          path: 'passsword',
          message: 'Invalid login! Try again.'
        }]
      }

      if(!user.confirmed){
        return [{
          path: 'email',
          message: 'Please confirm your email!'
        }]
      }

      return null
    }
  }
}
