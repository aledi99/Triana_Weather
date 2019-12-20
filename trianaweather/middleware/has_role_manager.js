'use strict'

let middlewares = {
    
    ensureRoleManager: (req,res,next)=>{
        if(req.user.roles == 'MANAGER'){
            next();
            (req, res, next);
        } else if(req.user.roles == 'ADMIN'){
            next();
            (req, res, next);
        } else {
            return res.send(403,"You are not allowed to access.");
        }
    }
}
    
module.exports = middlewares;