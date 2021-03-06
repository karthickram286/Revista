const superTest = require('supertest');
let server;
let token;

describe('User Rest APIs', () => {
    beforeEach(() => { 
        server = require('../../server');
        // token = new User().generateAuthToken();
    });
    afterEach(() => {
        server.close(); 
    });

    describe('POST /', () => {

        it('should add a user', async () => {
            const res = await superTest(server)
                .post('/api/user/addUser')
                .send({ name: 'testUser1', email: 'testUser@gmail.com', password: 'testUserPassword1' });

            expect(res.status).toBe(200);
        });

        it('should sign in a user(return auth token)', async () => {
            const res = await superTest(server)
                .post('/api/user/signInUser')
                .send({ name: 'testUser1', email: 'testUser@gmail.com', password: 'testUserPassword1' });
            
            expect(res.status).toBe(200);
        });

        it('should delete a user for given email', async() => {
            const res = await superTest(server)
                .delete('/api/user/deleteUser')
                .send({ email: 'testUser@gmail.com' });
            
            expect(res.status).toBe(200);
        })
    });
});