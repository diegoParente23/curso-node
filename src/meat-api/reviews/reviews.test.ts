import 'jest'
import * as request from 'supertest';
import * as mongoose from 'mongoose';

const address: string = (<any>global).address;
const token: string = (<any>global).auth;

test('get /reviews', () => {
    return request(address)
        .get('/reviews')
        .set('Authorization', token)
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.body.items).toBeInstanceOf(Array);
        }).catch(fail);
});

test('post /reviews', () => {
    return request(address)
        .post('/restaurants')
        .set('Authorization', token)
        .send({
            name: 'Restaurante do seu Zé'
        })
        .then(response => request(address)
            .post('/reviews')
            .send({
                "date": Date.now().toString(),
                "rating": 4,
                "comments": "Exepcional!!!",
                "user": new mongoose.Types.ObjectId(),
                "restaurants": response.body._id
            })
        ).catch(fail);
});