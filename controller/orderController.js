const OrderForm = require("../model/OrderModel");

const allorder = (req, res) => {
  OrderForm.find()
    .then((data) => {
      console.log(data);
      res.json(data);
    })
    .catch((error) => {
      errorHandler(error, req, res);
    });
};
const oneorder = async (req, res) => {
  try {
    const { id, idOrder } = req.params;
    // console.log(id);
    // console.log(idOrder);
    const order = await OrderForm.find({
      _id: idOrder,
      userId: id,
      is_delete: false,
    });
    res.json(order);
  } catch (error) {
    console.log({ error: error.message });
  }
};
const orders = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await OrderForm.find({
      userId: id,
      is_delete: false,
    });
    res.json(order);
    console.log(id);
  } catch (error) {
    console.log({ error: error.message });
  }
};

const orderemail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const order = await OrderForm.find({
      _id: id,
      is_delete: false,
    });
    res.json(order);
    // console.log("666666");
    // console.log(order);
    // console.log(id);
    // console.log("999999");
  } catch (error) {
    console.log({ error: error.message });
  }
};
const handleAddForm = async (req, res) => {
  const files = req.files;
  // console.log(files);
  // const userId = req.user._id;
  const {
    userId,
    applicantName,
    mobileNumber,
    email,
    location,
    services,
    serviceProvider,
    kindOfService,
    projectdescription,
    payment,
    completed,
    number,
    totalAreaBuilding,
    offiecsID,
  } = req.body;

  if (!files) {
    return res.status(400).send("No files provided");
  }

  // const images = files["images"]; // Array of image files
  const projects = files["projects"]; // Array of report files

  if (!projects) {
    return res.status(400).send("projects are required");
  }

  // const imagePaths = images.map((image) => image.path);
  const projectsPaths = projects.map((project) => project.path);

  const newForm = new OrderForm({
    userId: userId,
    applicantName: applicantName,
    mobileNumber: mobileNumber,
    email: email,
    location: location,
    services: services,
    serviceProvider: serviceProvider,
    kindOfService: kindOfService,
    projectdescription: projectdescription,
    // Images: imagePaths,
    projects: projectsPaths,
    completed: completed,
    number: number,
    payment: payment,
    totalAreaBuilding: totalAreaBuilding,
    offiecsID: offiecsID,
  });

  // Save the form to the database
  newForm
    .save()
    .then(() => {
      res.status(200).send("Form saved successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error saving form");
    });
  // console.log(newForm);
};
const updatePayment = async (req, res) => {
  try {
    const { id, idOrder } = req.params;
    console.log(id);
    console.log(idOrder);

    // Find the order and update the payment status
    const order = await OrderForm.findOneAndUpdate(
      {
        _id: idOrder,
        userId: id,
        is_delete: false,
        payment: "is waiting to pay",
      },
      {
        payment: "paid",
      },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ error: "Order not found or payment already made" });
    }

    res.json(order);
    console.log(order);
  } catch (error) {
    console.log({ error: error.message });
    res.status(500).json({ error: "Failed to update payment status" });
  }
};
const OfficeOrders = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const orders = await OrderForm.find({
      offiecsID: id,
      is_delete: false,
      payment: "paid",
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const OfficeOrdersDetails = async (req, res) => {
  const { id } = req.params;
  const orderId = req.query.orderId;
  console.log("55555555");
  console.log(id);
  console.log(orderId);
  console.log("22222222");
  try {
    const orders = await OrderForm.find({
      _id: orderId,
      offiecsID: id,
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const OfficeNewOrders = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const orders = await OrderForm.find({
      offiecsID: id,
      is_delete: false,
      payment: "paid",
      completed: "new",
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const OfficeCompletedOrders = async (req, res) => {
  const id = req.params.id;
  // console.log(id);
  try {
    const orders = await OrderForm.find({
      offiecsID: id,
      is_delete: false,
      payment: "paid",
      completed: "completed",
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fs = require("fs");
const path = require("path");

const addResponseOffice = async (req, res) => {
  const files = req.files;

  if (!files || !files["images"]) {
    return res.status(400).send("No files provided");
  }

  try {
    const order = await OrderForm.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Update the order's completed status if it is provided
    order.completed = "completed";
    const images = files["images"]; // Array of image files

    // Specify the destination folder for saving the images
    const imagesFolder = path.join(__dirname, "..", "images"); // Adjust the path if needed

    // Create the images folder if it doesn't exist
    if (!fs.existsSync(imagesFolder)) {
      fs.mkdirSync(imagesFolder);
    }

    // Remove existing image files associated with the order
    order.Images.forEach((imagePath) => {
      const filename = path.basename(imagePath);
      const filePath = path.join(imagesFolder, filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    // Update the image paths and move the new image files
    const imagePaths = images.map((image) => {
      const originalFilename = image.originalname;
      const uniqueIdentifier = Date.now().toString(36); // Generate a unique identifier
      const filename = uniqueIdentifier + path.extname(originalFilename);
      const destination = path.join(imagesFolder, filename); // Save path with the specified folder
      fs.renameSync(image.path, destination);
      return path.relative(__dirname, destination); // Save the relative path
    });

    order.Images = imagePaths;
    await order.save();

    res.status(200).send({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  allorder,
  oneorder,
  handleAddForm,
  orders,
  updatePayment,
  OfficeOrders,
  OfficeCompletedOrders,
  OfficeNewOrders,
  OfficeOrdersDetails,
  addResponseOffice,
  orderemail,
};
