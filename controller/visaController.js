const Visa = require("../model/Visa");

const allpayment = (req, res) => {
  Visa.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const onepayment = async (req, res) => {
  const formData = req.body;

  const newPayment = new Visa({
    cardholderName: formData.cardholderName,
    cardNumber: formData.cardNumber,
    expire: formData.expire,
    cvv: formData.cvv,
    price: formData.price,
    orderID: formData.orderID,
  });
  const payment = await newPayment.save();
  res.json(payment);
  console.log(formData);
};

module.exports = {
  allpayment,
  onepayment,
};
