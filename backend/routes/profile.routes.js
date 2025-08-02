const express = require('express');
const authenticate = require('../middleware/authentication.middleware');
const authorization = require("../middleware/authorization.middleware")
const {getProfile,updateProfile,deleteProfile} = require('../controllers/profile.controller');

const profileRouter = express.Router();
profileRouter.get("/profile",authenticate,authorization,getProfile)
profileRouter.patch("/profile",authenticate,updateProfile)
profileRouter.delete('/profile/:id', deleteProfile);

module.exports = profileRouter;