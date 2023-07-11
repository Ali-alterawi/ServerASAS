const Report = require("../model/Report");



const allReports = (req, res) => {
    Report.find()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

const oneReport = async (req, res) => {
    const formData = req.body;
  
    const newReport = new Report({
        orderID: formData.orderID,
        email: formData.email,
        mobile: formData.mobile,
        description: formData.description,
    });
    const Report = await newReport.save();
    res.json(Report);
  };
  
  module.exports = {
    allReports,
    oneReport, 
  };