const {validationResult} = require('express-validator');

module.exports = valdations => {
    
    return async (req, res, next) =>{
        for (const valdation of valdations) {
            const result = await valdation.run(req);
           
            if(!result.isEmpty()){
                return res.status(400).json({errors: result.array()})
            }
        }
        
        next();
    }
}