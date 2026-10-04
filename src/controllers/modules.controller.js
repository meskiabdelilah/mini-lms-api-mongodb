import Module from '../models/Module.js';

/**
 * Returns a module by its ID.
 */
const getModule = async (req, res) => {
    const module = await Module.findById(req.params.id);
    if (!module) {
        return res.status(404).json({
            message: "can not found"
        });
    }

    res.json(module);
}

export {getModule};