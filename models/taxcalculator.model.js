import mongoose from "mongoose";

const TaxCalculatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  basicSalary: {
    type: Number,
    required: true,
  },
  da: {
    type: Number,
    required: true,
  },
  hra: {
    type: Number,
    required: true,
  },
  otherAllowances: {
    type: Number,
    default: null,
  },
  deposits: {
    type: Number,
    default: null,
  },
  otherIncome: {
    type: Number,
    default: null,
  },
  medical: {
    type: Number,
    default: null,
  },
  homeLoan: {
    type: Number,
    default: null,
  },
  educationLoan: {
    type: Number,
    default: null,
  },
  nps: {
    type: Number,
    default: null,
  },
});

const TaxCalculator = mongoose.model("TaxCalculator", TaxCalculatorSchema);

export default TaxCalculator;
