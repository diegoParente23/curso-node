"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const environment_1 = require("../common/environment");
const users_model_1 = require("../users/users.model");
exports.tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environment_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
function extractToken(req) {
    const authorization = req.header('Authorization');
    let token = undefined;
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
        return token;
    }
}
;
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            users_model_1.User.findByEmail(decoded.sub).then(user => {
                if (user) {
                    req.authenticated = user;
                }
                next();
            });
        }
        else {
            next();
        }
    };
}
