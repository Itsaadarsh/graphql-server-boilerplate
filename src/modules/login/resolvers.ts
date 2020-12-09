import * as bcrypt from 'bcrypt'
import { GQL } from "../../types/schema"
import { User } from "../../entity/User";
import { ResolverMap } from '../../utils/interface';

export const resolvers: ResolverMap = {
  Mutation: {
    login: async(_, {email,password}: GQL.ILoginOnMutationArguments,{session} ) => {
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
      
      session.userId = user.id
      return null
    }
  }
}
