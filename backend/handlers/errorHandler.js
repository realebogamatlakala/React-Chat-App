
const { stack } = require("../app");

exports.catchErrors = (fn) => {
    return function (req, res, next){
        fn(req, res, next).catch((err) =>{
            if(typeof err === "string") {
                res.status(400).json({
                    message: err,
                });
            } else{
                next(err);

            }
        })
    }
};


exports.mongooseErrors = (err, req, res, next) => {
    if(!err.errors) return next(err);

    const errorKeys = Object.keys(err.errors);
    let message = "";
    errorKeys.forEach((key)=> (message += err.errors[key].message + ", "));

    message = message.substr(0, message.length -2);

    res.status(400).json({
        message,
    });
};




exports.developmentErrors = (err, req, res, next) => {
    err.stack = err.stack || "";
    const errorDetails = {
        message: err.message,
        status: err.status,
        stack: err.stack,
    };

    res.status(err.status || 500).json(errorDetails);
};

exports.productionErrors = (err, rq, res, next) => {
    res.status(err.status || 500).json({
        error: "Internal Server Error!"
    })
};


exports.notFound = (req, res, next) => {
    res.status(404).json({
        message: "The Path you have specified was not found!"
    });
};