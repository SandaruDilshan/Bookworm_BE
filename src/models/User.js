import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profileimage: {
        type: String,
        default: "",
    }
}, { timestamps: true }); 

//Hash password before saving
userSchema.pre("save", async function (next) {   // Mongoose midleware hook is used to perform actions before or after certain events occur in the lifecycle of a document.

    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);       // Generate a salt with 10 rounds (Random strings)
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

//Copmare password with hashed password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);
export default User;