const {
  userById,
  userSignUp,
  userSignIn,
  userSignOut,
  requireSignin,
} = require("../controllers/user");
const { userSignUpValidator } = require("../validator");
const { isAuth, isAdmin } = require("../controllers/auth");

module.exports = (app) => {
  app.post("/sign-in", userSignIn);

  app.get("/sign-out", userSignOut);

  app.post("/sign-up", userSignUpValidator, userSignUp);
};
