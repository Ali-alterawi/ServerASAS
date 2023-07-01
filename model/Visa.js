const mongoose = require("mongoose");

const VisaSchema = new mongoose.Schema(
  {
    cardholderName: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    expire: {
      type: String,
    },
    cvv: {
      type: String,
    },
    price: {
      type: String,
    },
    orderID: {
      type: mongoose.Schema.Types.ObjectId,
    },

    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Visa = mongoose.model("Visa", VisaSchema);

module.exports = Visa;