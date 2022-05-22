const express = require('express');
require("./database/databaseConnecting");

const app = express();
//Midlware 
app.use(express.json());
app.use(express.urlencoded());

//isdek ve response filtirlemekle

app.get("/",(request, response)=>{
    response.json({
        "message": "Xosh Geldiniz"
    })
});

app.post("/",(request, response)=>{
    response.json(request.body)
});

//Url Parametresi (params and query)
app.get("/:id",(request, response)=>{
    console.log(request.query);
    response.json(request.params)
});

app.listen("3500" ,()=>{
    console.log("SERVER start to 3500 port");
})