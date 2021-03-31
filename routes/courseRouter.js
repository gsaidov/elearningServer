const express = require("express");
const Course = require("../models/course");

const courseRouter = express.Router();

courseRouter
  .route("/")
  .get((req, res, next) => {
    Course.find()
      .then((courses) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(courses);
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Course.create(req.body)
      .then((course) => {
        console.log("Course created ", course);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(course);
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /courses");
  })
  .delete((req, res, next) => {
    Course.deleteMany()
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

// course/courseId route
courseRouter
  .route("/:courseId")
  .get((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(course);
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /course/${req.params.courseId}`);
  })
  .put((req, res, next) => {
    Course.findByIdAndUpdate(
      req.params.courseId,
      { $set: req.body },
      { new: true }
    )
      .then((course) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(course);
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Course.findByIdAndDelete(req.params.courseId)
      .then((response) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(response);
      })
      .catch((err) => next(err));
  });

module.exports = courseRouter;
