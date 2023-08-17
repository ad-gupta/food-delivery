import { Router } from 'express'
import { login, logout, signUp, signinWithGoogle } from '../controllers/auths.js';

const router = Router()

router.post('/signin', login);

router.post('/signup', signUp)

router.post('/google', signinWithGoogle)

router.get('/logout', logout);

export default router;