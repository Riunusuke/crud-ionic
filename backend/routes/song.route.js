const express = require("express");
const SongRoute = express.Router();
const SongModel = require("../model/Song");
const cors = require("cors");
// CORS OPTIONS
var whitelist = ["http://localhost:8100", "http://localhost:4000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    };
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions);
};
// CREATE
SongRoute.route("/create-song").post(async (req, res, next) => {
  await SongModel.create(req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// GET SINGLE
SongRoute.route("/get-song/:id").get(async (req, res, next) => {
  await SongModel.findById(req.params.id, req.body)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully retrieved.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// GET ALL
SongRoute.route("/", cors(corsOptionsDelegate)).get(async (req, res, next) => {
  await SongModel.find()
    .then((result) => {
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result));
    })
    .catch((err) => {
      return next(err);
    });
});
// UPDATE
SongRoute.route("/update-song/:id").put(async (req, res, next) => {
  await SongModel.findByIdAndUpdate(req.params.id, {
    $set: req.body,
  })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
// // DELETE
SongRoute.route("/delete-song/:id").delete(async (req, res) => {
  await SongModel.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = SongRoute;