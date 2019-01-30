import 'jest'
import * as request from 'supertest';

const address: string = (<any>global).address;
const token: string = (<any>global).auth;

test('get /users', () => {
    return request(address)
        .get('/users')
        .set('Authorization', token)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        }).catch(fail);
});

test('post /users', () => {
    return request(address)
        .post('/users')
        .set('Authorization', token)
        .send({
            name: 'usuario1',
            email: 'usuario1@gmail.com',
            password: '123456',
            cpf: '156.399.840-82'
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('usuario1');
            expect(response.body.email).toBe('usuario1@gmail.com');
            expect(response.body.cpf).toBe('156.399.840-82');
            expect(response.body.password).toBeUndefined();
        }).catch(fail);
});

test('patch /users/:id', () => {
    return request(address)
        .post('/users')
        .set('Authorization', token)
        .send({
            name: 'usuario2',
            email: 'usuario2@gmail.com',
            password: '123456',
        })
        .then(response => request(address)
            .patch(`/users/${response.body._id}`)
            .set('Authorization', token)
            .send({
                name: 'usuario2 - patch'
            }))
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('usuario2 - patch');
            expect(response.body.email).toBe('usuario2@gmail.com');
            expect(response.body.password).toBeUndefined();
        })
        .catch(fail);
});

test('get /users/aaaa - not found', () => {
    return request(address)
        .get('/users/aaaa')
        .set('Authorization', token)
        .then(response => {
            expect(response.status).toBe(404);
        }).catch(fail);
});

test('post /users/authenticate', () => {
    return request(address)
        .post('/users/authenticate')
        .send({
            email: "admin@email.com",
            password: "123456"
        })
        .then(response => {
            expect(response.status).toBe(200);
        }).catch(fail);
});

test('post /users/authenticate password invalid', () => {
    return request(address)
        .post('/users/authenticate')
        .send({
            email: "admin@email.com",
            password: "12"
        })
        .then(response => {
            expect(response.status).toBe(403);
        }).catch(fail);
});

test('post /users/authenticate email invalid', () => {
    return request(address)
        .post('/users/authenticate')
        .send({
            email: "admin2@email.com",
            password: "123456"
        })
        .then(response => {
            expect(response.status).toBe(403);
        }).catch(fail);
});