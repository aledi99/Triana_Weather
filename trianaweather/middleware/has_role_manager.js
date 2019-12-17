'use strict'

const error_types = require('../controllers/error_types');

let middlewares = {
    
    ensureRoleManager: (req,res,next)=>{
        if(req.user.roles == 'MANAGER'){
            next();
            (req, res, next);
        } else if(req.user.roles == 'ADMIN'){
            next();
            (req, res, next);
        } else {
            return res.send(403,"No tienes autorización");
        }
    }
}
    
module.exports = middlewares;