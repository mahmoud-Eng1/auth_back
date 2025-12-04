const express = require("express");
const User = require("../models/users")
const AppError = require("../utils/AppError")

const router = express.Router();

const getUsers = async (req, res, next)=> {
const allUsers = await User.find()
if(!allUsers) return next(new AppError("users not found",404))
    res.json(allUsers)
} ;

const getSingleUser = async (req, res, next)=> {
    const {id} =  req.params
    const user = await User.findById(id)
    if(!user) return next(new AppError("user not found",404))
    res.json(user)
}
const updateUser = async (req, res, next)=> {
const {id} = req.params
const update = await User.findByIdAndUpdate(id,req.body,{new: true})
if(!update) return next(new AppError("user not found",404))
res.status(201).send("successfull updated")
}

const deleteUser = async (req, res, next)=> {
    const {id} = req.params;
    const delet = await User.findByIdAndDelete(id)
    if(!delet) return next(new AppError("user not found",404))
    res.status(200).send("successfull delet")

}

module.exports = {
    deleteUser,
    updateUser,
    getSingleUser,
    getUsers,
}