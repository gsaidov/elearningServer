const express = require("express");
const courseRouter = express.Router();

courseRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Sending all courses");
  })
  .post((req, res) => {
    res.end(
      `Will add the course ${req.body.name} with description ${req.body.description}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /courses");
  })
  .delete((req, res) => {
    res.end("Deleting all courses");
  });

courseRouter
  .route("/:courseId")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end(`Sending the details of the course: ${req.params.courseId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /course/${req.params.courseId}`);
  })
  .put((req, res) => {
    res.write(`Updating the course ${req.params.courseId}\n`);
    res.end(
      `Will update the course: ${req.body.name} with description: ${req.body.description}`
    );
  })
  .delete((req, res) => {
    res.end(`Deleting course: ${req.params.courseId}`);
  });

module.exports = courseRouter;
