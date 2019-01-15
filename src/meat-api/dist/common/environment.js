"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    server: { port: process.env.SERVER_PORT || 3000 },
    // db: { url: process.env.DB_URL || 'mongodb://192.168.99.100:27017/meat-api'},
    db: { url: process.env.DB_URL || 'mongodb://172.18.0.2:27017/meat-api' },
    security: { saltRounds: process.env.SALT_ROUNDS || 10 }
};
