import mongoose from "mongoose";

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