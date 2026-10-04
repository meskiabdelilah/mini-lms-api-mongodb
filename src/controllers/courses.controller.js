import Course from '../models/Course.js';
import Module from '../models/Module.js';

/**
 * Return all courses.  
 */
const getCourses = async (req, res) => {
    const filter = {};
    
    if (req.query.category) {
        filter.category = req.query.category;
    }
    const courses = await Course.find(filter);

    res.json(courses);
}

const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({
            message: "Course not found"
        });
    }

    res.json(course);
}

const getCourseModules = async (req, res) => {
    const course = await Course.findById(req.params.id);
    if (!course) {
        return res.status(404).json({
            message: "can not found"
        });
    }

    const modules = await Module.find({
        course: req.params.id
    });

    res.json(modules);
}

export {getCourses};
export {getCourseById};
export {getCourseModules};