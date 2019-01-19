"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
exports.Restaurant = mongoose.model('Restaurants', restSchema);
