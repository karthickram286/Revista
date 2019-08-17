const superTest = require('supertest');
const User = require('../../model/user');
let server;
let token;

describe('User Rest APIs', () => {

    beforeEach(() => { 
        server = require('../../server');
        token = new User().generateAuthToken();
    });
    afterEach(() => {
        server.close(); 
    });

    describe('POST /', () => {

        let noteId;
        it('should add a note', async () => {
            const res = await superTest(server)
                .post('/api/notes/addNote')
                .set('x-auth-token', token)
                .send({ title: 'test-title', body: 'lorem ipsum' });
            noteId = res.body.id;

            expect(res.status).toBe(200);
        });

        it('should update a note', async () => {
            const res = await superTest(server)
                .post('/api/notes/updateNote/' + noteId)
                .set('x-auth-token', token)
                .send({ title: 'updated-test-title', body: 'updated lorem ipsum' });

            expect(res.status).toBe(200);
        });
    });
});