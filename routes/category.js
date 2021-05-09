const { isAuth, isAdmin } = require("../controllers/auth")
const { requireSignin, userById } = require("../controllers/user")
const { createCategory, categoryById, updateCategory, deleteCategory, getCategories  } = require("../controllers/category")

module.exports = (app) => {
    app.param("userId", userById )

    app.param("categoryId", categoryById )

    app.get("/categories", getCategories )

    app.post("/admin/create-category/:userId", requireSignin, isAuth, isAdmin, createCategory )
    
    app.put("/create-category/:categoryId/:userId", requireSignin, isAuth, isAdmin, updateCategory )

    app.delete("/delete-category/:categoryId/:userId", requireSignin, isAuth, isAdmin, deleteCategory )

}