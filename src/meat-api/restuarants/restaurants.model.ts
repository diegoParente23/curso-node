import * as mongoose from 'mongoose';

export interface MenuItem extends mongoose.Document {
    name: number;
    price: number;
}

export interface Restaurant extends mongoose.Document {
    name: string,
    menu: MenuItem[]
}

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    menu: {
        type: [],
        required: false,
        select: false
    }
});

const restSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export const Restaurant = mongoose.model<Restaurant>('Restaurants', restSchema);