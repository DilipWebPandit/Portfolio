import express, { Router } from "express";
import { sendMail, uploadProject } from "../controllers/adminProject.js";
import upload from "../config/multerConfig.js";

const uploadRoutes = express.Router();

uploadRoutes.post("/uploadProject", upload.single("webImage"), uploadProject);
uploadRoutes.post("/sendMail", sendMail);

export default uploadRoutes;
