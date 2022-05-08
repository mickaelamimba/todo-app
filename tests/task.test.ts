import request from 'supertest';
import app from "../index";
import {normalizePort} from "../src/app/config/config";




describe('Crud operation', () => {
    it('get all tasks', async () => {
        const res = await request(app).get('/api/v1/tasks');
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual(JSON.parse(res.text))
    })
    it('get single task',async () =>{
        const resTask = await request(app)
            .post('/api/v1/tasks').send({
                name:'my test task'
            })
        expect(resTask.statusCode).toEqual(201)
        const res = await request(app).get(`/api/v1/tasks/${resTask.body.tasks._id}`)
        expect(res.statusCode).toEqual(200)
        const deleteTask  = await request(app)
            .delete(`/api/v1/tasks/${resTask.body.tasks._id}`)
        expect(deleteTask.statusCode).toEqual(200)
        expect(deleteTask.body.status).toEqual('success')
    })
    it('create a task',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:'my test task tes'
            })
        expect(res.statusCode).toEqual(201)
        const deleteTask  = await request(app)
            .delete(`/api/v1/tasks/${res.body.tasks._id}`)
        expect(deleteTask.statusCode).toEqual(200)
        expect(deleteTask.body.status).toEqual('success')

    })
    it('update  a task',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:'my test task'
            })
        expect(res.statusCode).toEqual(201)

        const update  = await request(app)
            .put(`/api/v1/tasks/${res.body.tasks._id}`)
            .send({name:'my test task update'})
        expect(update.statusCode).toEqual(200)
        expect(update.body.tasks.name).toEqual('my test task update')
    })
    it('delete  a task',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:'my test task'
            })
        expect(res.statusCode).toEqual(201)

        const deleteTask  = await request(app)
            .delete(`/api/v1/tasks/${res.body.tasks._id}`)
        expect(deleteTask.statusCode).toEqual(200)
        expect(deleteTask.body.status).toEqual('success')
    })
    it('not_found tasks',async ()=>{
        const res = await request(app).get('/api/v1/tasks/627810edfc0d84b39c95d085');

        expect(res.statusCode).toEqual(404)

        expect(res.body).toEqual(JSON.parse(res.text))
    })
    it('server error task',async ()=>{
        const res = await request(app).get('/api/v1/tasks/amfer3565');
        expect(res.statusCode).toEqual(500)
    })
    it('mus provide name',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:''
            })
        expect(res.statusCode).toEqual(500)
        expect(res.body.msg.message).toEqual('Task validation failed: name: mus provide name')
    })
    it('name can not be more than 20 characters',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.'
            })
        expect(res.statusCode).toEqual(500)
        expect(res.body.msg.message).toEqual('Task validation failed: name: name can not be more than 20 characters')
    })
    it('id not fund for update', async ()=>{
        const res = await request(app)
            .put('/api/v1/tasks/627810edfc0d84b39c95d085').send({
                name:'Task validation'
            })
        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual(JSON.parse(res.text))
    })
    it('id not valid for update', async ()=>{
        const res = await request(app)
            .put('/api/v1/tasks/sdsds5132').send({
                name:'Task validation'
            })
        expect(res.statusCode).toEqual(500)
    })
    it('id not fund for delete', async ()=>{
        const res = await request(app)
            .delete('/api/v1/tasks/627810edfc0d84b39c95d085')
        expect(res.statusCode).toEqual(404)
        expect(res.body).toEqual(JSON.parse(res.text))
    })
    it('id not valid for delete', async ()=>{
        const res = await request(app)
            .delete('/api/v1/tasks/addgfd23')
        expect(res.statusCode).toEqual(500)

    })
    it('tes normalizePort', async ()=>{
        const port = normalizePort('0')
        expect(port ).toEqual(false)


    })
    it('tes normalizePort invalid port', async ()=>{
        const port = normalizePort('n')
        expect(port ).toEqual('n')

    })
})