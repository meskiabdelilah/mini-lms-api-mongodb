import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  level: {
    type: String,
    require: true,
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.new
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
