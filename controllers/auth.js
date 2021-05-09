const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id
    if (!user) {
      return res.status(403).json({
        error: "Access Denied",
      })
    }
    next()
  }
  const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
      return res.status(403).json({
        error: "Admin Access Denied",
      })
    }
    next()
  }
  module.exports = {
    isAuth,
    isAdmin,
  }
  