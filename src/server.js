const express = require('express')
const { db } = require('./models')

const app = express() // creating an object of express module

//For POST Requests

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/api',require('./routes/api'))

db.sync()
    .then( () => {
        app.listen(7788, ()=> {
            console.log('server started on http://localhost:7788') 
        })
    })
    .catch( (err) => {
        console.error(err)
    })

