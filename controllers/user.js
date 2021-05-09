const User = require("../models/user")
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});

const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User Not Found",
      });
    }
    req.profile = user;
    next();
  });
};

const userSignUp = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        status: "User failed to create",
        statusCode: 400,
        error: err,
      });
    }
    res.status(200).json({
      status: "User Successfully Created",
      statusCode: 200,
      user,
    });
  });
};

const userSignIn = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res.status(400).json({
        status: "User with the Email does not Exist.Please SignUp",
        statusCode: 400,
        error: "User with the Email does not Exist.Please SignUp",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        status: "Email and Password Dont Match",
        statusCode: 401,
        error: "Email and Password Dont Match",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;
    return res.json({
      statusCode: 200,
      status: "Successfully Loged In",
      token,
      user: { _id, email, name, role },
    });
  });
};

const userSignOut = (req, res) => {
  res.clearCookie("t");
  res.json({
    statusCode: 200,
    status: "Successfully Loged Out",
    message: "Sign Out Success",
  });
};

module.exports = {
  userById,
  userSignUp,
  userSignIn,
  userSignOut,
  requireSignin,
};
