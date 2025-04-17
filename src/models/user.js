const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");


const userSchema=mongoose.Schema(
    {
    firstName:{
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        trim : true,
        minLength: 4,
    },
    lastName:{
        type: String
    },
    emailId:{
        type: String,
        unique: true,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is not valid " +value);
            }
        }
    },
    password:{
        type: String,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password " +value);
            }
        }
    },
    age:{
        type: Number,
        min: 18
    },
    gender:{
        type: String,
        validate(value){
            if(!["male", "female", "others"].include(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    about:{
        type: String, 
        default: "This is default about"
    },
    photoUrl:{
        type: String, 
        default: "Image URL"
    },
    skills:{
        type: [String]
    }
},
{
    timestamps: true
}
)

userSchema.methods.getJWT = function () {  // No need for async
    const user = this;
    const token = jwt.sign({ _id: user._id }, "Dev@Tinder$790", { expiresIn: "1h" });
    return token;
};


userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}
const userModel=mongoose.model("User", userSchema);

module.exports=userModel;