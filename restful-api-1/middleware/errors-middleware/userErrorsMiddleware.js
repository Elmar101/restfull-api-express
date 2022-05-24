const userErrorMiddleware = (err , req , res ,next) =>{
    console.log(err);
    res.json({
        message: err.message,
        status: err.errorStatus
    })
    next(err);
}

module.exports = userErrorMiddleware;