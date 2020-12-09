import { User } from "../../entity/User";
import { ResolverMap } from "../../utils/interface";
import middleware, { createMiddleware } from "./middleware";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware,(_,__,{session}) => User.findOne({where: {id:session.userId}}))
  }
}