const Contact = require("../model/contact.model");
const User = require("../model/user.model");
const sendContactEmail = require("../utils/contact.helper");

const createContact = async (req, res) => {
    try {
        const { name, email, mobile, subject, message } = req.body;
    
        // Validate required fields
        if (!name || !email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required' });
        }
    
        // Create new contact message
        const newContact = new Contact({
        name,
        email,
        mobile,
        subject,
        message
        });
    
        await newContact.save();
       await sendContactEmail(newContact);
        res.status(201).json({
            message: 'Contact message created successfully',
            contact: newContact
        });
    } catch (error) {
        console.error('Error creating contact message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
    }

    const getContacts = async (req,res) => {
        try {
            const contacts = await Contact.find();
            res.status(200).json({
                message: 'Contacts retrieved successfully',
                contacts
            });
        } catch (error) {
            console.error('Error retrieving contacts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    module.exports = {createContact,getContacts}