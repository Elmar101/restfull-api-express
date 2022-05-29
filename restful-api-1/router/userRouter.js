const { Router } =  require("express");
const UserModel = require("../models/userModels");
const createError = require('http-errors');

const router = Router();
//butun userler
router.get("/", async (req , res)=>{
    const users = await UserModel.find({});
    res.json(users);
});
//params userDetail 
router.get("/:user_id", async (req , res)=>{
    const user_ID = req.params.user_id;
    try{
        const findUser = await UserModel.findById({_id: user_ID});
         if(findUser){
            res.json(findUser)
        }else{
            console.log(user_ID + " li user tapilmadi");
        } 
    }catch(err){
        console.log(err);
    }
});

//User Yaratmaq => Post request
router.post("/", async (req , res , next)=>{
    try {
        const addNewUser = new UserModel(req.body);
        const {error , value} = UserModel().joiValidation(req.body);
        if(error){
            next(error);
            console.log(error);
        }else{
            const result = await addNewUser.save();
            res.json(result);
        }
    }catch(err){
        next(err);
        console.log(err);
    }
});

//guncelenme => patch isdeyi
router.patch("/:user_id", async (req , res , next)=>{
    const user_ID = req.params.user_id;
    delete req.body.password;
    delete req.body.createdAt;
    delete req.body.updateAt
    console.log("re body", req.body);
    const {error ,result} = UserModel.joiValidationForUpdate(req.body);
    if(error){
        console.log(error);
       // next(error)
       next(createError(400 ,error))
    }
    else{
        try{
            const result = await UserModel.findByIdAndUpdate({
                _id: user_ID
            }, req.body ,{new: true,runValidators: true});
            
            if(result){
               return res.json(result);
            }else {
               return res.status(404).json(user_ID + " idli user tapilmadi");
            }
        }catch(err){
            next(err);
        }
    }
   
    
});

//silinecek user => delete isdeyi
router.delete("/:user_id", async (req , res , next)=>{
    const user_ID = req.params.user_id;
    try{
        const result = await UserModel.findByIdAndDelete({_id: user_ID});
        if(result){
            return res.json({
                message: "Silinen User" + result
            })
        }else {
            /* const error = new Error("istifadeci tapilmadi");
            error.errorStatus = "404" */
            throw createError(404 , "istifadeci tapilmadi");
            //console.log(req.params.user_id + " li User Tapilmadi");
        }
    }catch(err){
       next( createError(400 , err) );
    }
});

module.exports = router;