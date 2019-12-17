'use strict'

const error_types = require('../controllers/error_types');

let middlewares = {
    
    ensureRolAdmin: (req,res,next)=>{
        if(req.user.roles == 'ADMIN'){
            next();
            (req, res, next);
        } else {
            return next(new error_types.Error403("You are not allowed to access."));
        }
    }
}
    
module.exports = middlewares;