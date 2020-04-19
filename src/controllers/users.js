const {Users} = require('../models')
const {createJwt} = require('../utils/jwt')

async function createUser(userOpts){

    if(!userOpts.username){
        throw new Error('Did not supply username')
    }
    if(!userOpts.email){
        throw new Error('Did not supply email')
    }
    if(!userOpts.password){
        throw new Error('Did not supply password')
    }

    const user = await Users.create({
        // TODO: passwords not in plain text
        ... userOpts

    })  
    
    if(!user) throw new Error('Could not create user')

    // adding token 

    const createdUser = await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'], 
        where: {
            username: user.username
        }
    })

    createdUser.token = await createJwt(createdUser.get())

    return {
        ... createdUser.get(),
        token
    }
}

async function verifyUser(userOpts) {
    if (!userOpts.email) {
      throw new Error('Did not supply email')
    }
    if (!userOpts.password) {
      throw new Error('Did not supply password')
    }
  
    const user = await Users.findOne({
      attributes: ['email', 'username', 'bio', 'image','password'],
      where: {
        email: userOpts.email,
      }
    })
  
    if (!user) {
      throw new Error('No user with given email address')
    }
  
    if (user.password !== userOpts.password) {
      throw new Error('Password does not match')
    }

    delete user.password // we don't want to return the user password
    
    user.token = await createJwt(user.get())

    const userJson = {
        ... user.get(),
        token
    }

    delete userJson.password
    return userJson
}
  
module.exports = {
    createUser,
    verifyUser
} 