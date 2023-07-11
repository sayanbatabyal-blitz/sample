import { GetTaskRequestParam } from "@/controllers/typings/task.controller"
import { NextFunction, Request, Response } from "express"
import RedisClient from '../redis/redis.client'
class RedisMiddleware{
    public redisClient=new RedisClient()
    constructor(){
        this.redisClient.connectClient()      
    }
    /**
     * To search for a task in redis server before calling the getCall to DB
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @returns 
     */
    public getData = async(req:Request,res:Response,next:NextFunction ) => {   
        const requestParam:GetTaskRequestParam=req.params
        const data = await this.redisClient.get(`task:${requestParam.id}`);
        if(data) return res.status(201).json(JSON.parse(data))
        next()
    }

}

export default RedisMiddleware