const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middleware/500");
require("dotenv").config();
const AllUser = (req, res) => {
      User.find()
          .then((data) => {
              // console.log(data);
              res.json(data);
          })
          .catch((error) => {
              errorHandler(error, req, res);
          });
};

const oneUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id});

  console.log("----------------");
  console.log(id);
  console.log(user);
  console.log("--------------------------------");
  res.json(user);

};
const one = async (req, res) => {
  const id = req.params.id;
  const user = await User.find({ _id: id});

  console.log("----------------");
  console.log(id);
  console.log(user);
  console.log("--------------------------------");
  res.json(user);

};


const newUser = async (req, res, next) => {
    try {
      const { role, userName, email, phone, password, service, message } = req.body;
  
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "Email is already registered" });
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
  
      // Create a new User document using the schema
      const newUserDoc = new User({
        userName,
        email,
        role,
        phone,
        password: hashedPassword,
        service,
        message,
      });
  
      // Save the document to the database
      const newUser = await newUserDoc.save();
  
      const token = jwt.sign(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
  console.log(token);
      const { password: userPassword, ...userData } = newUser._doc;
  
      res.status(201).json({ ...userData, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred while registering a user" });
    }
  };
  
  
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }
      
      const token = jwt.sign(
        { id: user._id, email: user.email , role: user.role},
        process.env.JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );
      console.log(token);
      const { password: userPassword, ...other } = user._doc;
      res.status(200).json({ ...other, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error occurred while logging in" });
    }
  };
  
  
    
const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  const user = await User.findById(userId);
  if (!user) {
      return res.status(401).send('User not found');
  }
  const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
  });
  res.json(updatedUser);
};
const deleteUser = async (req, res) => {
  // try {
  //     const userId = req.params.id;
  //     const updatedUserData = req.body;
  //     updatedUserData.is_delete = true;
  //     updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
  //     const user = await User.findByIdAndUpdate(userId, updatedUserData, {
  //         new: true,
  //     });
  //     const updatedUser = await user.save();
  //     res.json(updatedUser);
  // } catch (error) {
  //     res.status(500).json({ error: 'Failed to update User' });
  // }
};



const verifyJWT = (req, res, next) => {
    const token = req.headers.authorization.trim();
    console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'No token provided.' });
    }
  
    jwt.verify(token,process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("token error:", err); // Log the error object for debugging
        return res.status(403).json({ message: 'Failed to authenticate token.' });
      }
      console.log("token Authenticated");
      // console.log(decoded);
      res.json({ message: 'Authenticated', user: decoded });
    });
  
}

module.exports = {
  AllUser,
  newUser,
  loginUser,
  oneUser,
  updateUser,
  deleteUser,
  verifyJWT,
  one
};
