import { Router } from "express";
import { verifyToken } from "../verifyToken.js";
import { addDish, getAllDishes, getBreakfast, getBurger, getDinner, getFastfood, getLunch, getPizza, search } from "../controllers/dishes.js";

const router = Router();

router.post('/addDish', verifyToken ,addDish)

router.get('/getAll', getAllDishes)

router.get('/search', search)

router.get('/breakfast', getBreakfast)

router.get('/lunch', getLunch)

router.get('/dinner', getDinner)

router.get('/fastFood', getFastfood)

router.get('/pizza', getPizza)

router.get('/burger', getBurger)
export default router