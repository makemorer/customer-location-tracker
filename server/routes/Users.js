const express = require('express')
const router = express.Router()

//the table for quering
const usersTable = require('../models')

router.post('/', async (req, res)=>{
    //info from user
    const infoFromUser = req.body //req.body is in object format
    //post to user table
    await usersTable.create(infoFromUser)
    res.json(infoFromUser)
})

module.exports = router