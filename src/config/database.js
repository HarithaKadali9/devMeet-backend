const mongoose =require("mongoose");
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://HarithaKadali:Haritha23@namasthenode.edsir.mongodb.net/?retryWrites=true&w=majority&appName=NamastheNode/devTinder")
}
module.exports=connectDB;