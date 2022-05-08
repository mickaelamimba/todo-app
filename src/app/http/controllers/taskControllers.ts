
import {Response,Request} from "express/ts4.0";
import {Task} from "../../../models/task";
import {StatusCodes} from "http-status-codes";

/**
 * @controllers TaskControllers
 */
export default class TaskControllers {
    /**
     * Get all task
     * @param req
     * @param res
     */
    static async getAllTask(req: Request, res: Response){
        try {
           const tasks= await Task.find({})
            res.status(StatusCodes.OK).json({tasks,status:'success'})
        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }

    }

    /**
     * Get single task
     * @param req
     * @param res
     */
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

    /**
     * Creat a task
     * @param req
     * @param res
     */
    static async createTask(req: Request, res: Response){
        try {
            const tasks= await Task.create(req.body)
            res.status(StatusCodes.CREATED).json({tasks,status:'success'})

        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }
    }

    /**
     *  Update a task
     * @param req
     * @param res
     */
    static async updateTask(req: Request, res: Response){
        try {
            const {id:paramsId}= req.params
            const tasks= await Task.findOneAndUpdate({_id:paramsId},req.body,{
                new:true,
                runValidators:true
            })
            if (!paramsId){
                res.status(StatusCodes.NOT_FOUND).json({tasks:null,status:'not_found'})
            }
            res.status(StatusCodes.OK).json({tasks,status:'success'})

        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }
    }

    /**
     * delete a task
     * @param req
     * @param res
     */
    static async deleteTask(req: Request, res: Response){
        try {
            const {id:paramsId}= req.params
            const tasks= await Task.findOneAndDelete({_id:paramsId})
            if (!paramsId){
                res.status(StatusCodes.NOT_FOUND).json({tasks:null,status:'not_found'})
            }
            res.status(StatusCodes.OK).json({tasks:null,status:'success'})

        }catch (err) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err,status:'error'})
        }
    }
}