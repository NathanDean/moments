import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

export const signup = async (req, res) => {
    const {firstName, surname, email, password, confirmPassword} = req.body;

    try {
        
        const existingUser = await User.findOne({email});

        if(existingUser) {
            return res.status(400).json({message: "User already registered with this email address."})
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Passwords do not match."})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({
            name: `${firstName} ${surname}`, 
            email, 
            password: hashedPassword
        })

        const token = jwt.sign({
            email: result.email, 
            id: result._id
        }, process.env.SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({result, token})

    } catch (error) {
        res.status(500).json({message: "Error signing up."});
    }
};

export const signin = async (req, res) => {

    const {email, password} = req.body;

    try {
        // Searches for user with matching email address
        const existingUser = await User.findOne({email});

        if(!existingUser) {
            return res.status(404).json({message: "No user matching this email address."})
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Incorrect password."})
        }

        const token = jwt.sign({
            email: existingUser.email, 
            id: existingUser._id
        }, process.env.SECRET, {
            expiresIn: "1h"
        });

        res.status(200).json({result: existingUser, token})

    } catch (error) {
        res.status(500).json({message: "Error signing in."});
    }
};