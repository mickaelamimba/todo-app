
import {Response,Request} from "express/ts4.0";
import {Task} from "../../../models/task";
import {StatusCodes} from "http-status-codes";

export default class TaskControllers {
    static async getAllTask(req: Request, res: Response){
        try {
           const tasks= await Task.find({})
            res.status(StatusCodes.OK).json({tasks,status:'success'})
        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }

    }
    static async getTask(req: Request, res: Response){
        try {
            const {id:paramsId}= req.params
            const tasks= await Task.findOne({_id:paramsId})
            if (!paramsId){
                res.status(StatusCodes.NOT_FOUND).json({tasks:null,status:'not_found'})
            }
            res.status(StatusCodes.OK).json({tasks,status:'success'})

        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }
    }
}