import express from "express";
import {
  calculationHistory,
  deleteCalculation,
} from "../controllers/calculationHistory.controller.js";

const router = express.Router();

router.post("/", calculationHistory);
router.delete("/:id", deleteCalculation);
export default router;
