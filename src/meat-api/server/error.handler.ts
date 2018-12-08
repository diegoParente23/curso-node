import * as restify from 'restify'

export const handleError = (req: restify.Request, resp: restify.Response, error, done) => {
    error.toJSON = () => {
        return {
            message: error.message
        }
    }
    switch(error.name) {
        case 'MongoError':
            if(error.code === 11000) {
                error.statusCode = 400;
            }
            break;
        case 'ValidationError': 
            error.statusCode = 400;
            break;
    }
    done();
}