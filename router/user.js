const {Router} = require("express");
const router =Router();
const User = require("../models/user");
router.get('/signin',(req,res)=>{
    return res.render("signin");
})
router.get('/signup',(req,res)=>{
    return res.render("signup");
})
router.get("/mybank",(req,res)=>{
    return res.render("mybank");
})
router.get("/dashboard",(req,res)=>{
    return res.render("dashboard");
})

// router.post('/signin',async (req,res)=>{
//     const {email,password} = req.body

//     // console.log("email",email);
    
//     const user=await  User.matchPassword(email,password);
    
//     return res.redirect("/Finance-manager/app/Dashboard.html");
     

// })
router.post('/signin',async (req,res)=>{
    const {email,password} = req.body

    // console.log("email",email);
    
    try
    {
        const user=await  User.matchPassword(email,password);
        return res.redirect("/Finance-manager/app/Dashboard.html");
    }
    catch(err)
    {
        return res.render("signin",{error: err.message});
    }
   
     

})
router.post('/signup',async (req,res)=>{
    const {fullName,email,number,password} = req.body;
    
   
    await User.create({
        fullName,
        email,
        number,
        password,
    });
    return res.redirect("/Finance-manager/app/Dashboard.html");
})


module.exports = router;