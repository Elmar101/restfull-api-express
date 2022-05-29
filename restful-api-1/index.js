const express = require('express');
require("./database/databaseConnecting");
const userRouter = require("./router/userRouter");
const userErrorMiddleware = require("./middleware/errors-middleware/userErrorsMiddleware");
const { required } = require('joi');
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
/* app.use((err , req , res , next)=>{
    console.log("indexde---" + err);
    next(err);
}); */ 
app.use(userErrorMiddleware);
const bcrypt = require('bcrypt');
const test = async ()=>{
    const password = "elmar12345eldar"
    const hashPassword = await bcrypt.hash(password , 10);
    console.log("Password: " , password);
    console.log("hash password: ", hashPassword);
    //Compare etmek 
    const compare1 = await bcrypt.compare("elik12345", hashPassword)
    const compare2 = await bcrypt.compare("elmar12345eldar", hashPassword)
    console.log(" compare1: ", compare1 , " \n compare2" , compare2);
}
test();
app.listen("3500" ,()=>{
    console.log("SERVER start to 3500 port");
})