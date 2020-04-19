const jwt = require('jsonwebtoken')
const constants = require('./constants')

const JWT_SECRET = constants.SECRET

async function createJwt(user) {

    //by default synchronous - no need to use await in front of jwt.sign..
    const token = jwt.sign(user,JWT_SECRET) 

    return token
}

async function verifyJwt(token){

    const user = jwt.verify(token,JWT_SECRET)

    return user
}

module.exports = {
    createJwt,
    verifyJwt
}