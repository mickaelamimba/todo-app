import {Schema,model} from "mongoose";


interface ITask {
    name:String,
    completed:Boolean

}
const TaskSchema = new Schema<ITask>({
    name: {
        type:String,
        required:[true,'mus provide name'],
        trim:true,
        maxlength:[20,'name can not be more than 20 characters'],
    },
    completed: {
        type:Boolean,
        default:false,
    }

})
export const Task = model<ITask>('Task',TaskSchema)