import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    order: {
        type: Number,
        require: true
    },    
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        require: true
    }
});


const Module = mongoose.model("Module", moduleSchema);

export default Module;