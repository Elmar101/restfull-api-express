const express = require('express');
require("./database/databaseConnecting");
const userRouter = require("./router/userRouter");

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
    //response.json(request.params);
    response.json(request.query);
});

/*/users request start/*/
app.use("/api/users", userRouter);

/*/users request end /*/


app.listen("3500" ,()=>{
    console.log("SERVER start to 3500 port");
})