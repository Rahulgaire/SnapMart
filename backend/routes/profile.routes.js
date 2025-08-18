const express = require('express');
const authenticate = require('../middleware/authentication.middleware');
const authorization = require("../middleware/authorization.middleware")
const {getProfile,updateProfile,deleteProfile,deleteAllUsers} = require('../controllers/profile.controller');

const profileRouter = express.Router();
profileRouter.get("/",authenticate,authorization,getProfile)
profileRouter.patch("/",authenticate,updateProfile)
profileRouter.delete('/:id', deleteProfile);
profileRouter.delete('/', deleteAllUsers);

module.exports = profileRouter;