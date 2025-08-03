import express from 'express'
import { getUserProfile, loginUser, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

//protected route as a token will be required
userRouter.get('/profile', protect,getUserProfile)

export default userRouter