const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");

// const contactController = require("../controllers/contactController");
// router.route("/").get(contactController.getContacts);
// router.route("/").post(contactController.createContact);
// router.route("/:id").get(contactController.getContact);
// router.route("/:id").put(contactController.updateContact);
// router.route("/:id").delete(contactController.deleteContact);

// ......Other way to write routes for same endpoint....................
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
// Note: if you want to validate all the routes then you should use below way of doing this.
router.use(validateToken); // other way to validate ( from user controller)

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
