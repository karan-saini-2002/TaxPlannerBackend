import TaxCalculator from "../models/taxcalculator.model.js";

export const calculationHistory = async (req, res, next) => {
  try {
    const CalculationHistory = await TaxCalculator.find();
    console.log(CalculationHistory);
    res
      .status(201)
      .json({ message: "History Fetched successfully", CalculationHistory });
  } catch (error) {
    next(error);
  }
};

export const deleteCalculation = async (req, res) => {
  try {
    const calculationId = req.params.id;
    await TaxCalculator.findByIdAndDelete(calculationId);

    res.status(200).json({ message: "Calculation deleted successfully" });
  } catch (error) {
    console.error("Error deleting calculation:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting calculation" });
  }
};
