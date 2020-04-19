const { Router } = require('express')
const {createUSer} = require('../../controllers/users')

const route = Router()

route.post('/', async (req,res)=>{
    const createdUser = await createUSer({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    res.send(createdUser)
})

module.exports = route