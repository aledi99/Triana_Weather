'use strict'

const error_types = require('../controllers/error_types');

let middlewares = {
    
    ensureRolAdmin: (req,res,next)=>{
        if(req.user.roles == 'ADMIN'){
            next();
            (req, res, next);
        } else {
            return res.send(403,"No tienes autorización");
        }
    }
}
    
module.exports = middlewares;