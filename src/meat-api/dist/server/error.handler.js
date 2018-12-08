"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = (req, resp, error, done) => {
    error.toJSON = () => {
        return {
            message: error.message
        };
    };
    switch (error.name) {
        case 'MongoError':
            if (error.code === 11000) {
                error.statusCode = 400;
            }
            break;
        case 'ValidationError':
            error.statusCode = 400;
            break;
    }
    done();
};
