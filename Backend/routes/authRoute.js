import express from "express"
import { login } from "../controllers/authcontroller.js";
import { uiValidation } from "../controllers/authcontroller.js";
const router = express.Router()

router.post("/login" ,login);
router.get('/api/uiValidation',uiValidation);



export default router;