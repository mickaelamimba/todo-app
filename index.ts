import express from 'express';
import morgan from 'morgan'
import { Express } from "express/ts4.0";
import dotenv from 'dotenv'
import {ConnectDB, normalizePort} from "./src/app/config/config";
import route from "./src/app/routes/task";
dotenv.config()
//middleware
const app :Express = express()
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port);
//route
app.use('/api/v1/tasks',route)

//start
const start = async ()=>{
    try {
        await ConnectDB(process.env.DB_URL||'null')
        app.listen(port)
    }
    catch (e) {
        console.log(e)
    }

}
start()

export default app
