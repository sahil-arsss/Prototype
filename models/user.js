const { Schema ,model} = require("mongoose");

const {createHmac,randomBytes} = require("crypto");
const { use } = require("../router/user");
const { createTokenForUser } = require("../services/auth");
const { type } = require("os");
const userSchema = new Schema ({
    fullName: {
        type: String,
        required:true,
    },
    email: {
        type : String,
        required:true,
        unique: true,
    },
    number: {
        type: String,
        required: true,
    },
    salt: {
        type : String,
        
        
    },
    password: {
        type : String,
        required:true,
        
    },
    profileImageUrl:
    {
        type: String,
        default: "/images/default.png",
    },
    role: {
        type : String,
        enum : ["USER","ADMIN"],
        default : 'USER',
    }
},{timestamps: true});


userSchema.pre("save",function (next){
    const user =this;
    if(!user.isModified("password")) return;
    const salt= "salt123";
    const hashPassword = createHmac("sha256",salt)
    .update(user.password)
    .digest("hex");
    this.salt=salt;
    this.password=hashPassword;
    next();
})
// userSchema.static("matchPasswordAndGenrateToken",async function(email,password){
//     const user = await this.findOne({email});
//     if(!user)  throw new Error("User not Found!");    
    
//     const salt =user.salt;
//     const hashPassword=user.password;
//     const userProvidedHash =createHmac("sha256",salt)
//     .update(password)
//     .digest("hex");
//     if(hashPassword!==userProvidedHash) throw new Error("password is wrong");    
//     // return {...user,password: undefined,salt: undefined};
//     const token =createTokenForUser(user);
//     return token;
//     return
// })
userSchema.static("matchPassword",async function(email,password){
    const user = await this.findOne({email});
    console.log(user);
    if(!user)  throw new Error("User not Found!");    
    const salt =user.salt;
    const hashPassword=user.password;
    const userProvidedHash =createHmac("sha256",salt)
    .update(password)
    .digest("hex");
    if(hashPassword!==userProvidedHash) throw new Error("password is wrong");    
    return {...user,password: undefined,salt: undefined};
    // return user;
})
const User =model('user',userSchema);

module.exports = User;