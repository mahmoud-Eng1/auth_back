const allowedCorse = require("./allowedCors.js")
const corsOptins = {
    origin : (origin, callback)=> {
        if(allowedCorse.indexOf(origin)!==-1 || !origin){
            callback(null, true)
        } else {
            callback(new Error("Not Allowed by CORS"))
        }
    },
    credentials: true,
    optionSuccessstatuse: 200
}

module.exports = corsOptins;
