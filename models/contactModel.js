const mongoose = require("mongoose");
const contactSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a contact name"],
    },
    email: {
      type: String,
      required: [true, "Please enter a contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please enter a contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
