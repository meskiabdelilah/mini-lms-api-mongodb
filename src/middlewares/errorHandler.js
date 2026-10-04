/**
 * handles unexpected application errors.
 */
const errorHandler = (err, req, res, next) => {
    console.error(err);
    
    res.status(500).json({
        message: "Internal serer error"
    });
};

export default errorHandler;