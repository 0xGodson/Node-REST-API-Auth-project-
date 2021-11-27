const Joi = require('@hapi/joi')



const registerValidate = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(2).required(),
        password: Joi.string().min(2).required()
    })
    return schema.validate(data)
}   
    
const loginValidate = (data) =>  {
    const schema = Joi.object({
            username: Joi.string().min(2).required(),
            password: Joi.string().min(2).required()
    })
    return schema.validate(data)
        
}

module.exports.registerValidate = registerValidate
module.exports.loginValidate = loginValidate
