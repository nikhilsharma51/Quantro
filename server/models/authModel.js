import express from "express";
import mongoose, { mongo } from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          v
        );
      },
      message:
        "Password must have atleast 8 characters, contain one uppercase, one lowercase, one number, and one special character",
    },
  },
}, {timestamps : true}
);

//hashing before saving

userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt)
    next;
});

userSchema.methods.matchPassword = async function(enteredpassword){
    return await bcrypt.compare(enteredpassword,this.password);
};

const User = mongoose.model("User",userSchema);

export default User;


