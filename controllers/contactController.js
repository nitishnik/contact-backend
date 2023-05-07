const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

//@desc Create new contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  const contacts = await Contact.create({ ...req.body });
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are required");
  }
  res.status(201).json(contacts);
});

//@desc Get a contacts
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  console.log(req.params.id, "req.params.idreq.params.id");
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

//@desc Update a contacts
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  res.status(200).json({
    statusCode: res.statusCode,
    message: `Update contact for ${req.params.id}`,
    data: updatedContact,
  });
});

//@desc Delete a contacts
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  res.status(200).json({
    statusCode: res.statusCode,
    message: `Delete a contact for ${req.params.id}`,
    data: contact,
  });
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
