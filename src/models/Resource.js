import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  url: {
    type: String
  },

  content: {
    type: String
  },

  module: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Module",
    required: true
  }
});

const Resource = mongoose.model("Resource", resourceSchema);

export default Resource;