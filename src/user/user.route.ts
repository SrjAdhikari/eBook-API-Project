//* src/user/user.route.ts

import { Router } from "express";
import { createUser, loginUser } from "./user.controller";

const userRouter = Router();

// Create User
userRouter.post("/register", createUser);

// Login User
userRouter.post("/login", loginUser);

export default userRouter;
