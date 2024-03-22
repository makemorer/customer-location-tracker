const express = require('express')
const app = express()
const db = require('./models')
const cors = require('cors')
const userRouter = require('./routes/Users')
app.use(express.json())
app.use(cors())
//Router
app.use('/locations', userRouter)

db.sequelize.sync().then(
    ()=>{
        app.listen(3001, ()=>{
            console.log(`server started and running`)
        }) 
    }
)
