import express from 'express';
import { getModule } from '../controllers/modules.controller.js';

const router = express.Router();

router.get("/:id",getModule)

export default router;