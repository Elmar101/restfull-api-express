const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/restfull_api").then(res=> {
    console.log("CONNECTED DATABASE");
}).catch(error=>{ console.log("Could not connected database")});