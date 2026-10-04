import mongoose from "mongoose";

/**
 * Represents a course in the LMS.
 * A course contains general information such as title, category and level.
 */
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
