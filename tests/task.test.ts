import request from 'supertest';
import app from "../index";




describe('Crud operation', () => {
    it('get all tasks', async () => {
        const res = await request(app).get('/api/v1/tasks');
        expect(res.statusCode).toEqual(200)
    })
    it('get single tasks',async () =>{
        const res = await request(app).get('/api/v1/tasks/6275ae7db282a8dd2045ffc0')
        expect(res.statusCode).toEqual(200)
    })
    it('create a task',async ()=>{
        const res = await request(app)
            .post('/api/v1/tasks').send({
                name:'my test task'
            })
        expect(res.statusCode).toEqual(201)
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
})