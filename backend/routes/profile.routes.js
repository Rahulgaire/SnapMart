const express = require("express");
const authenticate = require("../middleware/authentication.middleware");
const {
  getProfile,
  updateProfile,
  deleteProfile,
  deleteAllUsers,
} = require("../controllers/profile.controller");
const {allowedRoles} = require("../middleware/roleAccess")
const profileRouter = express.Router();

profileRouter.get("/:email", authenticate, allowedRoles('user', 'admin'), getProfile);
profileRouter.patch("/", authenticate, allowedRoles('user', 'admin'), updateProfile);
profileRouter.delete("/:id", authenticate, allowedRoles('admin'), deleteProfile);
profileRouter.delete("/", authenticate, allowedRoles('admin'), deleteAllUsers);

module.exports = profileRouter;
