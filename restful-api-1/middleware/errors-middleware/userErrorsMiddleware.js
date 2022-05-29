const userErrorMiddleware = (err , req , res ,next) =>{
   console.log("Error is" , err);
   res.status(err.statusCode || 500)
    if(err.code === 11000){
        return res.json({
            statusCode: err.statusCode || 500,
            message: Object.keys(err.keyValue) + " ichin girdiyiniz " +  
            Object.values(err.keyValue) + " daha evel databazada olduqu " +
            " ichin guncelene ve elave edile bilmez" + 
            JSON.stringify(err.keyValue) + " unique olmalidi"
        }) 
   }

   if(err.code === 66){
    return res.json({
        statusCode: err.statusCode || 500,
        message: err.message 
    })
   }

   
     res.json({
        statusCode: err.statusCode || 404,
        message: err.message
    })
   
}

module.exports = userErrorMiddleware;