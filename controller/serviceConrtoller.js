const User = require("../model/UserModel");

const companiesInterior = async (req, res) => {
    try {
        const companiesInterior = await User.find({ role: 0, service: "Interior Design" });
        res.json(companiesInterior);
        console.log(companiesInterior);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in service controller" });
      }
    };
const companiesQuantity = async (req, res) => {
    try {
        const companiesQuantity = await User.find({ role: 0, service: "Quantity serving" });
        res.json(companiesQuantity);
        console.log(companiesQuantity);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in service controller" });
      }
    };
const companiesEngineering = async (req, res) => {
    try {
        const companiesEngineering = await User.find({ role: 0, service: "Engineering Design" });
        res.json(companiesEngineering);
        console.log(companiesEngineering);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error in service controller" });
      }
    };




    module.exports = {
        companiesInterior,
        companiesQuantity,
        companiesEngineering
      };