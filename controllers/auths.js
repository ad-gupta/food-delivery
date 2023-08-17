import jwt from "jsonwebtoken";
import user from "../models/user.js";
import bcrypt from 'bcrypt'
import { createError } from "../error.js";

export const login = async(req, resp, next) => {
    try{
        let {email, password} = req.body;
        if(email && password) {
            const arrivingUser = await user.findOne({email});
            const isCorrect = await bcrypt.compare(password, arrivingUser.password);

            if(!isCorrect) next(createError(500, 'Enter Correct password'))
            const token = jwt.sign({id: arrivingUser._id}, process.env.JWT)
            resp
            .cookie('access_token', token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
            })
            .status(200)
            .json(arrivingUser.username)
        }else if(!email) next(createError(500, 'enter email'))
        else if(!password) next(createError(500, 'enter password'))
    }catch(err) {
        next(err)
    }
}

export const signUp = async(req, resp, next) => {
    try{
        let {username, email, password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        if(username && email && password) {
            const newUser = await user.create({username, email, password: hash})
            
            const token = jwt.sign({ id: newUser._id }, process.env.JWT);

            let {password, ...others} = newUser._doc;
            resp
            .cookie('access_token', token, {
                httpOnly: true,
                maxAge: 15 * 60 * 1000,
            })
            .status(201)
            .json(others)
        }else if(!username) next(createError(500, 'enter username'))
        else if(!email) next(createError(500, 'enter email'))
        else if(!password) next(createError(500, 'enter password'))
    }catch(err) {
        next(err)
    }
}

export const logout = async (req, resp, next) => {
    try {
      resp.clearCookie("access_token");
      resp.send('Logged out successfully');
    } catch (err) {
      next(err);
    }
  };

export const signinWithGoogle = async (req, resp, next) => {
    try {
      const userr = await user.findOne({ email: req.body.email });
      if (userr) {
        const token = jwt.sign({ id: userr._id }, process.env.JWT);
        resp
          .cookie("access_token", token, {
            httpOnly: false,
          })
          .status(200)
          .json(userr._doc);
      } else {
        const newUser = await user.create({
          ...req.body,
          fromGoogle: true,
        });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT);
        resp
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
          })
          .status(200)
          .json(newUser._doc);
      }
    } catch (err) {
      next(err);
    }
  };