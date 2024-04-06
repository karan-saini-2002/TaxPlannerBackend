import express from "express";
import {
  calculateTax,
  fetchHistory,
} from "../controllers/taxcalculator.controller.js";

const router = express.Router();

router.post("/", calculateTax);
router.post("/:id", fetchHistory);

export default router;
