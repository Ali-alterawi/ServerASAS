const mongoose = require("mongoose");

const orderFormSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    applicantName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    services: {
      type: String,
      required: true,
    },
    offiecsID:{
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    serviceProvider: {
      type: String,
      required: true,
    },
    kindOfService: {
      type: String,
      required: true,
    },
    projectdescription: {
      type: String,
    },
    totalAreaBuilding: {
      type: Number,
    },
    file: {
      type: Object,
    },
    payment: {
      type: String,
      enum: ["paid", "is waiting to pay"],
      default: "is waiting to pay",
    },
    number: {
      type: String,
    },
    completed: {
      type: String,
      enum: ["completed", "new"],
      default: "new",
    },
    Images: {
      type: [String],
      // required: true,
    },
    projects: {
      type: [String],
      // required: true,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const OrderForm = mongoose.model("OrderForm", orderFormSchema);

module.exports = OrderForm;
