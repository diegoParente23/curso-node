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

test('put /restaurants/:id/menu', () => {
    return request(address)
        .post('/restaurants')
        .send({
            name: 'Restaurante do seu Zé',
        })
        .then(response => request(address)
            .put(`/restaurants/${response.body._id}/menu`)
            .send([
                {
                    name: 'Pork Burger',
                    price: 22
                },
                {
                    name: 'Cow Burger',
                    price: 25
                }
            ]
        ))
        .then(response => {
            expect(response.status).toBe(200);
        })
        .catch(fail);
});

test('patch /restaurants/:aaa not found', () => {
    return request(address)
        .post('/restaurants')
        .send({
            name: 'Restaurante do seu Zé',
        })
        .then(response => request(address)
            .get(`/restaurants/aaa`))
        .then(response => {
            expect(response.status).toBe(404);
        })
        .catch(fail);
});