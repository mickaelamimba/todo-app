import {connect} from "mongoose";


export const normalizePort = (val: string) : Number | boolean |String => {
    const port = parseInt(val, 10)
    if (isNaN(port)){
        return val
    }
    if (port>0){
        return port
    }
    return false;
}

export const ConnectDB =(url:string)=>{
    return connect(url)
}