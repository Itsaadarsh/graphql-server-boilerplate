import { Redis } from "ioredis"
import { v4 } from "uuid"

export const confEmailLink = async(url:string,userId:string,redis:Redis) => {
    const id = v4()
    await redis.set(id,userId,'ex',60*60*24)
    return `${url}/confirm/${id}`
}