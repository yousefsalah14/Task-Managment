import { Router } from "express";
import * as authController from './auth.controller.js'

const router = Router()

// sign in 
// steps add user data in request body
router.post('/signup',authController.signUp)
// log in
// sign in with email or mobile phone and password
router.post( '/signin', authController.signIn )

export default router