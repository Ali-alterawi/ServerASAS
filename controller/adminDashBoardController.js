const User = require("../model/UserModel");
const OrderForm = require("../model/OrderModel");
const Visa = require("../model/Visa");

const AllClients = (req, res) => {
  User.find({ role: 1 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const AllOffices = (req, res) => {
  User.find({ role: 0 })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const AllordersAdmin = (req, res) => {
  OrderForm.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const PaymentAdmin = (req, res) => {
  Visa.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};

const getTotalUserNumber = (req, res) => {
  User.countDocuments({ role: 1 })
    .then((count) => {
      res.json({ totalUsers: count });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const getTotalOfficeNumber = (req, res) => {
  User.countDocuments({ role: 0 })
    .then((count) => {
      res.json({ totalOffice: count });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const getTotalOrderNumber = (req, res) => {
  OrderForm.countDocuments()
    .then((count) => {
      res.json({ totalOrder: count });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};
const getTotalIncome = (req, res) => {
  Visa.find()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    });
};

const updateUserStatus = async (req, res) => {
  const { userId } = req.params;
  const { is_delete } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { is_delete },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user status" });
  }
};
const updateUserActive = async (req, res) => {
  const { userId } = req.params;
  const { isActive } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not Active" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user activate" });
  }
};



module.exports = {
  AllClients,
  AllOffices,
  AllordersAdmin,
  PaymentAdmin,
  getTotalUserNumber,
  getTotalOfficeNumber,
  getTotalOrderNumber,
  getTotalIncome,
  updateUserStatus,
  updateUserActive
};
