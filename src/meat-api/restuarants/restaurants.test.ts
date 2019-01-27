import 'jest'
import * as request from 'supertest';

let address: string = (<any>global).address;

test('get /restaurants', () => {
    return request(address)
        .get('/restaurants')
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        }).catch(fail);
});

test('post /restaurants', () => {
    return request(address)
        .post('/restaurants')
        .send({
            name: 'Restaurante do seu Zé'
        })
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('Restaurante do seu Zé');
        }).catch(fail);
});

test('patch /restaurants/:id', () => {
    return request(address)
        .post('/restaurants')
        .send({
            name: 'Restaurante do seu Zé',
        })
        .then(response => request(address)
            .patch(`/restaurants/${response.body._id}`)
            .send({
                name: 'Restaurante do seu Zé - patch'
            }))
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBe('Restaurante do seu Zé - patch');
        })
        .catch(fail);
});