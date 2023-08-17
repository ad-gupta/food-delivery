import breakfast from "../models/breakfast.js"
import burger from "../models/burger.js"
import dinner from "../models/dinner.js"
import dishes from "../models/dishes.js"
import fastFood from "../models/fastFood.js"
import lunch from "../models/lunch.js"
import pizza from "../models/pizza.js"


export const addDish = async(req, resp, next) => {
    const {dishName, dishPic} = req.body
    if(dishName && dishPic){
        const newDish = await dishes.create({
            ownerId: req.user.id, dishName, dishPic
        })
        resp
        .status(201)
        .send(`${req.user} you have successfully added ${dishName}`)
    }
}

export const getAllDishes = async(req, resp, next) => {
    try{
        const dishe = await dishes.find({})
        resp.send(dishe)
    }catch(err) {
        next(err)
    }
}


export const getDish = async(req, resp, next) => {
    const id = req.params.id;
    const dish = dishes.findById(id);
    if(!dish) next(400, 'No dish is found of this id')
    resp.status(200)
    .json(dish)
}


export const search = async(req, resp, next) => {
    const query = req.query.q;
    try {
        const dish = await dishes.find({
        dishName: { $regex: query, $options: "i" },
        }).limit(20);
        resp.status(200).json(dish);
    } catch (err) {
        next(err);
    }
}

export const getBreakfast = async(req, resp, next) => {
    try{
        const breakfst = await breakfast.find({});
        if(breakfst) {
            resp
            .status(200)
            .json(breakfst);
        }
    }catch(err){
        next(err);
    }
}

export const getLunch = async(req, resp, next) => {
    try{
        const data = await lunch.find({});
        if(data) {
            resp
            .status(200)
            .json(data);
        }
    }catch(err){
        next(err);
    }
}


export const getDinner = async(req, resp, next) => {
    try{
        const data = await dinner.find({});
        if(data) {
            resp
            .status(200)
            .json(data);
        }
    }catch(err){
        next(err);
    }
}

export const getFastfood = async(req, resp, next) => {
    try{
        const data = await fastFood.find({});
        if(data) {
            resp
            .status(200)
            .json(data);
        }
    }catch(err){
        next(err);
    }
}

export const getPizza = async(req, resp, next) => {
    try{
        const data = await pizza.find({});
        if(data) {
            resp
            .status(200)
            .json(data);
        }
    }catch(err){
        next(err);
    }
}

export const getBurger = async(req, resp, next) => {
    try{
        const data = await burger.find({});
        if(data) {
            resp
            .status(200)
            .json(data);
        }
    }catch(err){
        next(err);
    }
}