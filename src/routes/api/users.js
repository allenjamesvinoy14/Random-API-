const { Router } = require('express')
const {createUSer,verifyUser} = require('../../controllers/users')

const route = Router()

route.post('/', async (req,res)=>{

    const createdUser = await createUSer({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })

    res.send(createdUser)

})

route.post('/login',async (req,res)=>{
    try{
        const verifiedUser = await verifyUser(req.body.user)
        res.send(verifiedUser)
    } catch(err){
        res.status(403).send({
            errors: {
                body: [err.message] 
            }
        })
    }
})

module.exports = route