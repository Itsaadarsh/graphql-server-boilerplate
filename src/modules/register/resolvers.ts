import * as yup from 'yup'
import { GQL } from "../../types/schema"
import * as bcrypt from "bcrypt"
import { User } from "../../entity/User";
import { yupErrorHandling } from '../../utils/yupErrorHanding';

const schema = yup.object().shape({
  email: yup.string().min(3).max(255).email(),
  password: yup.string().min(6).max(255)
})

interface ResolverMap {
  [key: string]: {
    [key: string]: (parent:any,args: any, context: {}, info:any) => any
  }
}

export const resolvers: ResolverMap = {
  Mutation: {
    register: async(_, args: GQL.IRegisterOnMutationArguments) => {
      try{
        await schema.validate(args, {abortEarly: false})
      }catch(err){
        return yupErrorHandling(err)
      }
      
      const {email,password} = args
      const findUser = await User.findOne({where: {email},select: ["id"]})
      if(findUser) {
        return [
          {
            path: "email",
            message: "Email Already Taken!"
          }
        ]
      }
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({email, password: hash})
      await user.save()
      return null
    }
  }
}
