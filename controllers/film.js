const Film = require("../models/film");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const createFilm = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be Uploaded",
      });
    }
    const {
      name,
      description,
      price,
      category,
      mainActor,
      secondActor,
      director,
      ticketQuantity,
      releasedDate,
    } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !mainActor ||
      !secondActor ||
      !director ||
      !category ||
      !ticketQuantity ||
      !releasedDate
    ) {
      return res.status(400).json({
        error: " All fields are required ",
      });
    }
    let film = new Film(fields);
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than 3mb",
        });
      }
      film.photo.data = fs.readFileSync(files.photo.path);
      film.photo.contentType = files.photo.type;
    }
    film.save((err, result) => {
      if (err) {
        return res.status(400).json({
          status: "Failed to Create a Product",
          statusCode: 400,
          content: err,
        });
      }
      return res.status(200).json({
        status: "Successfully Created a Product",
        statusCode: 200,
        content: result,
      });
    });
  });
};
const getFilmPhoto = (req, res, next) => {
  if (req.film.photo.data) {
    res.set("content-Type", req.film.contentType);
    return res.send(req.film.photo.data);
  }
  next();
};

const filmById = (req, res, next, id) => {
  Film.findById(id).exec((err, film) => {
    if (err || !film) {
      return res.status(400).json({
        error: "Film is Not Found",
      });
    }
    req.film = film;
    next();
  });
};
const getAllFilms = (req, res) => {
  Film.find()
    .select("-photo")
    .populate("category")
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          status: "Failed to Fetch Films",
          statusCode: 400,
          content: err,
        });
      }
      return res.status(200).json({
        status: "Successfully Fetched Films",
        statusCode: 200,
        content: data,
      });
    });
};
const updatefilmById = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be Uploaded",
      });
    }
    const {
      name,
      description,
      price,
      category,
      mainActor,
      secondActor,
      director,
      ticketQuantity,
      releasedDate,
    } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !mainActor ||
      !secondActor ||
      !director ||
      !category ||
      !ticketQuantity ||
      !releasedDate
    ) {
      return res.status(400).json({
        error: " All fields are required ",
      });
    }
    let film = req.film;
    film = _.extend(film, fields);
    if (files.photo) {
      if (files.photo.size > 3000000) {
        return res.status(400).json({
          error: "Image should be less than 1mb",
        });
      }
      film.photo.data = fs.readFileSync(files.photo.path);
      film.photo.contentType = files.photo.type;
    }
    film.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.status(200).json(result);
    });
  });
};
const removefilmById = (req, res) => {
  let film = req.film;
  film.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Productn is Not Found",
      });
    }
    return res.status(200).json({
      status: "Successfully Deleted the Product",
      statusCode: 200,
      content: req.film,
    });
  });
};
module.exports = {
  filmById,
  createFilm,
  getAllFilms,
  getFilmPhoto,
  removefilmById,
  updatefilmById,
};
