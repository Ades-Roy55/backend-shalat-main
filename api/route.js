import express from "express";
import { getLogin, login, register } from "./app.js";
import { verifyToken } from "./middleware.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/getLogin", verifyToken, getLogin);

export default route;
