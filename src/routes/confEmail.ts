import { User } from '../entity/User'
import {Request,Response} from 'express'
import { redis } from '../utils/redisInstance'

export const confEmailRoute = async (req:Request,res:Response) => {
    const {id} = req.params
    const userId = await redis.get(id)
    if(userId){
        await User.update({id:userId},{confirmed:true})
        await redis.del(id)
        res.send('Confirmed')
    }
    else{
        res.send('Something went wrong!')
    }
}