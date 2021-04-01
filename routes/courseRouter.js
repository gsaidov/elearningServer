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

// /course/courseId/reviews route
courseRouter
  .route("/:courseId/reviews")
  .get((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(course.reviews);
        } else {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course) {
          course.reviews.push(req.body);
          course
            .save()
            .then((course) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(course.reviews);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT operation not supported on /courses${req.params.courseId}/reviews`
    );
  })
  .delete((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course) {
          for (let i = course.reviews.length - 1; i >= 0; i--) {
            course.reviews.id(course.reviews[i]._id).remove();
          }
          course
            .save()
            .then((course) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(course.reviews);
            })
            .catch((err) => next(err));
        } else {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });
// /course/courseId/reviews/:reviewId route
courseRouter
  .route("/:courseId/reviews/:reviewId")
  .get((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course && course.reviews.id(req.params.reviewId)) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(course.reviews.id(req.params.reviewId));
        } else if (!course) {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Course ${req.params.reviewId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /courses/${req.params.courseId}/reviews/${req.params.reviewId}`
    );
  })
  .put((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course && course.reviews.id(req.params.reviewId)) {
          if (req.body.rating) {
            course.reviews.id(req.params.reviewId).rating = req.body.rating;
          }
          if (req.body.text) {
            course.reviews.id(req.params.reviewId).text = req.body.text;
          }
          course
            .save()
            .then((course) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(course);
            })
            .catch((err) => next(err));
        } else if (!course) {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Course ${req.params.reviewId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  })
  .delete((req, res, next) => {
    Course.findById(req.params.courseId)
      .then((course) => {
        if (course && course.reviews.id(req.params.reviewId)) {
          course.reviews.id(req.params.reviewId).remove();
          course
            .save()
            .then((course) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(course);
            })
            .catch((err) => next(err));
        } else if (!course) {
          err = new Error(`Course ${req.params.courseId} not found`);
          err.status = 404;
          return next(err);
        } else {
          err = new Error(`Course ${req.params.reviewId} not found`);
          err.status = 404;
          return next(err);
        }
      })
      .catch((err) => next(err));
  });

module.exports = courseRouter;
