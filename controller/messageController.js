const Message = require("../model/Message");



const allMessages = (req, res) => {
    Message.find()
      .then((data) => {
        console.log(data);
        res.json(data);
      })
      .catch((error) => {
        errorHandler(error, req, res);
      });
  };

const oneMessage = async (req, res) => {
    const formData = req.body;
  
    const newMessage = new Message({
        name: formData.orderID,
        email: formData.email,
        message: formData.mobile,
    });
    const Messages = await newMessage.save();
    res.json(Messages);
  };
  
  module.exports = {
    allMessages,
    oneMessage, 
  };