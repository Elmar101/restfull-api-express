const { Router } =  require("express");
const UserModel = require("../models/userModels");

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
router.post("/", async (req , res)=>{
    try {
        const addNewUser = new UserModel(req.body);
        const result = await addNewUser.save();
        res.json(result);
    }catch(err){console.log("user yaradilmadi " + err)}
});

//guncelenme => patch isdeyi
router.patch("/:user_id", async (req , res)=>{
    const user_ID = req.params.user_id;
    try{
        const result = await UserModel.findByIdAndUpdate({
            _id: user_ID
        }, req.body ,{new: true,runValidators: true});
        
        if(result){
           return res.json(result);
        }else {
           return console.log(user_ID + " idli user tapilmadi");
        }
    }catch(err){
        console.log("guncelerken xeta oldu : "+err);
    }
    
});

//silinecek user => delete isdeyi
router.delete("/:user_id", async (req , res)=>{
    const user_ID = req.params.user_id;
    try{
        const result = await UserModel.findByIdAndDelete({_id: user_ID});
        if(result){
            res.json({
                message: "Silinen User" + result
            })
        }else {
            console.log(req.params.user_id + " li User Tapilmadi");
        }
    }catch(err){
        console.log("Useri silerken bir xeta oldu " + err);
    }
});

module.exports = router;