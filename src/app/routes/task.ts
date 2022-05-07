import express from 'express';
import {Router} from "express/ts4.0";
import TaskControllers from "../http/controllers/taskControllers";
const route :Router = express.Router()
route.route('/').get(TaskControllers.getAllTask).post(TaskControllers.createTask)
route.route('/:id').get(TaskControllers.getTask)
export default route