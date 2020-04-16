const { Router } = require('express')

const route = Router()

route.get('/',(req,res) => {

    //TODO: send current user

    res.send({
        "user":{
            "email" : "jamesallenvinoy@gmail.com",
            "token" : "jwt.token.here",
            "username" : "allenjamesvinoy",
            "image" : null
        }
    })
    
})

module.exports = route