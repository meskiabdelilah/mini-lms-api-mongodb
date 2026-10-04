import express from 'express'; 
import {getCourseById, getCourseModules, getCourses} from '../controllers/courses.controller.js';

const router = express.Router();

router.get("/", getCourses);
router.get("/:id/modules", getCourseModules);
router.get("/:id", getCourseById);

export default router;