const  {createContact,getContacts} = require("../controllers/contact.controller")
const express = require('express')
const contactRoute = express.Router()

contactRoute.post('/contact',createContact)
contactRoute.get('/contact',getContacts)

module.exports = contactRoute