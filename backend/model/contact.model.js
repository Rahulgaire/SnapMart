const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile:{type: String, required: false }, // Optional field
  subject: { type: String, required: true },
  message: { type: String, required: true },
},
{
    timestamps:true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
