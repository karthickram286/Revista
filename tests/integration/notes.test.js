const superTest = require('supertest');
const User = require('../../model/user');
let server;
let token;
let noteId;

describe('Note Rest APIs', () => {

    beforeEach(() => { 
        server = require('../../server');
        token = new User().generateAuthToken();
    });
    afterEach(() => {
        server.close(); 
    });

    describe('POST /', () => {

        it('should add a note', async () => {
            const res = await superTest(server)
                .post('/api/notes/addNote')
                .set('x-auth-token', token)
                .send({ title: 'test-title', body: 'lorem ipsum' });
            noteId = res.body.id;

            expect(res.status).toBe(200);
        });

        it('should update a note for a given id', async () => {
            const res = await superTest(server)
                .post('/api/notes/updateNote/' + noteId)
                .set('x-auth-token', token)
                .send({ title: 'updated-test-title', body: 'updated lorem ipsum' });

            expect(res.status).toBe(200);
        });
    });

    describe('Get /', () => {
        it('should get a note for a given id', async () => {
            const res = await superTest(server)
                .get('/api/notes/getNote/' + noteId)
                .set('x-auth-token', token);
            
            expect(res.status).toBe(200);
        });

        it ('should return all notes', async () => {
            const res = await superTest(server)
                .get('/api/notes/getAllNotes')
                .set('x-auth-token', token);
            
            expect(res.status).toBe(200);
        });
    });

    describe('Delete /', () => {
        it('should delete a note for a given id', async () => {
            const res = await superTest(server)
                .delete('/api/notes/deleteNote/' + noteId)
                .set('x-auth-token', token);
            
            expect(res.status).toBe(200);
        });
    });
});