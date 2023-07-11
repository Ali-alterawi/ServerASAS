const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    description: {
      type: String,
    },
    is_delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
