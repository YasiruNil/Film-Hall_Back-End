const Category = require("../models/category");

const createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Failed to Create Category",
        statusCode: 400,
        error: err,
      });
    }
    res.json({
      status: "Successfully Created Category",
      statusCode: 200,
      content: data,
    });
  });
};
const categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category is Not Found",
      });
    }
    req.category = category;
    next();
  });
};
const getCategories = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        status: "Category list failed to fetch",
        statusCode: 400,
        content: err,
      });
    }
    res.status(200).json({
      status: "Successfully Fetch Categories",
      statusCode: 200,
      content: data,
    });
  });
};
const deleteCategory = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "category delete failed",
      });
    }
    res.status(200).json({
      status: "Category successfully Deleted",
      statusCode: 200,
      message: "Category successfully Deleted",
    });
  });
};
const updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "category update failed",
      });
    }
    return res.status(200).json({
      status: "Successfully updated the category",
      statusCode: 200,
      content: data,
    });
  });
};

module.exports = {
  categoryById,
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
