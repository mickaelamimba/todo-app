
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
}