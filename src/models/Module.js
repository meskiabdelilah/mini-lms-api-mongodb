import mongoose from "mongoose";

/**
 * Represents a module that belongs to a Course.
 */
const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        required: true
    },    
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
});


const Module = mongoose.model("Module", moduleSchema);

export default Module;