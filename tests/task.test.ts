import request from 'supertest';
import app from "../index";




describe('Crud operation', () => {
    it('get all tasks', async () => {
        const res = await request(app).get('/api/v1/tasks');
        expect(res.statusCode).toEqual(200)
    })
    it('get single tasks',async () =>{

    })
})