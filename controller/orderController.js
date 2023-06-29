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
    console.log(id);
    console.log(idOrder);
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

  // Check for duplicate forms in the database
  // const duplicateForm = await OrderForm.findOne({ _id: req.body._id }).exec();
  // if (duplicateForm) {
  //   return res.status(409).send({ message: "The form already exists" });
  // }
  console.log("-------------");
  console.log(userId);
  console.log("------------");
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
  console.log(newForm);
};
module.exports = {
  allorder,
  oneorder,
  handleAddForm,
  orders
};
