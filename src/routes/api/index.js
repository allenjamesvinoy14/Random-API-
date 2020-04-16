const { Router } = require('express') // equivalent of const Router = require('express').Router

const route = Router()

route.use('/users',require('./users'))
route.use('/user',require('./user'))
route.use('/profiles',require('./profiles'))
route.use('/tags',require('./tags'))
route.use('/articles',require('./articles'))

module.exports = route

//to deal with endpoints of type /articles/comments deal with it inside of /articles/index.js