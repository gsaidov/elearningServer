const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const syllabusSchema = new Schema({
//   id: {
//     type: Number,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
// });

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    // syllabus: [syllabusSchema],
    syllabus: [
      {
        _id: {
          type: Number,
          required: true,
          unique: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
