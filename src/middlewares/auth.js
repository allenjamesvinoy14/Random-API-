const {verifyJwt} = require('../utils/jwt')

async function userAuthViaToken(req,res,next) {
    const auth =  req.header('Authorization') // given as a key during get request

    if(!auth){
        return res.status(403).send({
            errors: {
                body: [' Only for logged in users ']
            }
        })
    }

    if(!auth.startsWith('Token')) {
        return res.status(400).send({
            errors: {
                body: [' Authorisation format not supported ']
            }
        })
    }

    const token = auth.substr(6) // string will be of form Token <token>

    try{

        const user  = await verifyJwt(token)
        req.user = user
        return next()

    } catch (err) {

        res.status(403).send({
            errors: {
                body: [' JWT verification failed ']
            }
        })

    }
}

module.exports = {
    userAuthViaToken
}