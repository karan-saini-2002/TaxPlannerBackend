import TaxCalculator from "../models/taxcalculator.model.js";
import { errorHandler } from "../utils/error.js";

function oldTaxCalculate(taxCalculator) {
  let taxableIncome = 0;
  let totalTax = 0;
  let form_ded = 0;

  taxableIncome += taxCalculator.basicSalary;
  taxableIncome += taxCalculator.da;
  taxableIncome += taxCalculator.hra;
  taxableIncome -= Math.min(
    taxCalculator.hra,
    0.4 * (taxCalculator.basicSalary + taxCalculator.da)
  );
  taxableIncome += taxCalculator.otherAllowances;

  // console.log(taxableIncome);

  if (taxCalculator.otherIncome > 50000)
    taxableIncome += taxCalculator.otherIncome - 50000;

  // console.log(taxableIncome);

  if (taxCalculator.medical > 25000) {
    taxableIncome -= 25000;
    form_ded += 25000;
  } else {
    taxableIncome -= taxCalculator.medical;
    form_ded += taxCalculator.medical;
  }

  // console.log(taxableIncome);
  if (taxCalculator.deposits > 400000) {
    taxableIncome += 0.1 * (taxCalculator.deposits - 40000);
  }
  if (taxCalculator.nps <= 150000) {
    taxableIncome -= taxCalculator.nps;
    form_ded += taxCalculator.nps;
  } else {
    taxableIncome -= 150000;
    form_ded += 150000;
  }
  if (taxCalculator.homeLoan <= 200000) {
    taxableIncome -= taxCalculator.homeLoan;
    form_ded += taxCalculator.homeLoan;
  } else {
    taxableIncome -= 200000;
    form_ded += 200000;
  }
  taxableIncome -= taxCalculator.educationLoan;
  form_ded += taxCalculator.educationLoan;

  // console.log(taxableIncome);

  taxableIncome -= 50000; //standard ded
  if (taxableIncome > 250000) {
    let z1 = Math.min(taxableIncome - 250000, 250000);
    totalTax += 0.05 * z1;
  }
  if (taxableIncome > 500000) {
    let z2 = Math.min(taxableIncome - 500000, 500000);
    totalTax += 0.2 * z2;
  }
  if (taxableIncome > 1000000) {
    let z3 = taxableIncome - 1000000;
    totalTax += 0.3 * z3;
  }
  console.log("Sd :50000");
  console.log("Form Deductions:" + form_ded);
  console.log("taxableIncome" + taxableIncome);
  console.log("TotalTax" + totalTax);
  const taxDetails = {
    sd: 50000,
    formDeductions: form_ded,
    taxableIncome: taxableIncome,
    totalTax: totalTax,
  };
  return taxDetails;
}

function newTaxCalculate(taxCalculator) {
  let taxableIncome = 0;
  let totalTax = 0;
  let form_ded = 0;

  taxableIncome += taxCalculator.basicSalary;
  taxableIncome += taxCalculator.da;
  taxableIncome += taxCalculator.hra;
  taxableIncome += taxCalculator.otherAllowances;
  taxableIncome += taxCalculator.otherIncome;
  taxableIncome += taxCalculator.medical;
  if (taxCalculator.deposits > 400000) {
    taxableIncome += 0.1 * (taxCalculator.deposits - 40000);
  }
  if (taxCalculator.nps <= 150000) {
    taxableIncome -= taxCalculator.nps;
    form_ded += taxCalculator.nps;
  } else {
    taxableIncome -= 150000;
    form_ded += 150000;
  }

  taxableIncome += taxCalculator.homeLoan;
  form_ded += taxCalculator.homeLoan;

  taxableIncome += taxCalculator.educationLoan;
  form_ded += taxCalculator.educationLoan;

  taxableIncome -= 50000; //standard ded

  if (taxableIncome > 300000) {
    let z1 = Math.min(taxableIncome - 300000, 300000);
    totalTax += 0.05 * z1;
  }
  if (taxableIncome > 600000) {
    let z2 = Math.min(taxableIncome - 600000, 300000);
    totalTax += 0.1 * z2;
  }
  if (taxableIncome > 900000) {
    let z3 = Math.min(taxableIncome - 900000, 300000);
    totalTax += 0.15 * z3;
  }
  if (taxableIncome > 1200000) {
    let z4 = Math.min(taxableIncome - 1200000, 300000);
    totalTax += 0.2 * z4;
  }
  if (taxableIncome > 1500000) {
    let z5 = taxableIncome - 1500000;
    totalTax += 0.3 * z5;
  }

  console.log("newtax");
  console.log("Sd : 50000");
  console.log("Form Deductions:" + form_ded);
  console.log("taxableIncome" + taxableIncome);
  console.log("TotalTax" + totalTax);
  const taxDetails = {
    sd: 50000,
    formDeductions: form_ded,
    taxableIncome: taxableIncome,
    totalTax: totalTax,
  };
  return taxDetails;
}

function taxSaving(taxCalculator) {
  let taxSavingDetails = [];
  if (taxCalculator.medical == null) {
    taxSavingDetails.push("You can invest ₹25,000 in Medical Insurance.");
  } else if (taxCalculator.medical < 25000) {
    taxSavingDetails.push(
      "You can invest ₹" +
        (25000 - taxCalculator.medical) +
        " more in Medical Insurance"
    );
  }
  if (taxCalculator.nps == null) {
    taxSavingDetails.push("You can invest ₹1,50,000 in NPS Scheme.");
  } else if (taxCalculator.nps < 150000) {
    taxSavingDetails.push(
      "You can invest ₹" + (150000 - taxCalculator.nps) + " more in NPS Scheme."
    );
  }

  if (taxCalculator.deposits == null) {
    taxSavingDetails.push(
      "You can generate ₹40,000 interest from Deposits to save taxes."
    );
  } else if (taxCalculator.deposits < 40000) {
    taxSavingDetails.push(
      "You can generate ₹" +
        (40000 - taxCalculator.deposits) +
        " more interest from Deposits to save taxes."
    );
  }
  taxSavingDetails.push("You can Save TDS by submitting Form 15G/H.");
  taxSavingDetails.push(
    "You can open Sukanya Samriddhi Account to save more taxes."
  );
  console.log(taxSavingDetails);
  return taxSavingDetails;
}
export const calculateTax = async (req, res, next) => {
  try {
    const {
      name,
      basicSalary,
      da,
      hra,
      otherAllowances,
      deposits,
      otherIncome,
      medical,
      homeLoan,
      educationLoan,
      nps,
      id: CalculationId,
    } = req.body;
    console.log(CalculationId);
    let taxCalculator = null;
    if (CalculationId != "") {
      taxCalculator = await TaxCalculator.findById(CalculationId);
    }

    if (!taxCalculator) {
      // Create a new TaxCalculator instance if _id not found or provided
      taxCalculator = new TaxCalculator({
        name,
        basicSalary,
        da,
        hra,
        otherAllowances,
        deposits,
        otherIncome,
        medical,
        homeLoan,
        educationLoan,
        nps,
      });
    } else {
      // Update existing document with provided data
      taxCalculator.name = name;
      taxCalculator.basicSalary = basicSalary;
      taxCalculator.da = da;
      taxCalculator.hra = hra;
      taxCalculator.otherAllowances = otherAllowances;
      taxCalculator.deposits = deposits;
      taxCalculator.otherIncome = otherIncome;
      taxCalculator.medical = medical;
      taxCalculator.homeLoan = homeLoan;
      taxCalculator.educationLoan = educationLoan;
      taxCalculator.nps = nps;
    }
    const oldTaxDetails = oldTaxCalculate(taxCalculator);
    // console.log(oldTaxDetails);

    const newTaxDetails = newTaxCalculate(taxCalculator);
    const taxSavingDetails = taxSaving(taxCalculator);
    // Save the tax calculation result
    // let existingTaxCalculator = await TaxCalculator.findOne(id);
    // const id = taxCalculator._id.toString();
    // console.log(taxCalculator._id.toString());
    await taxCalculator.save();
    res.status(200).json({
      message: "Tax calculation successful",
      id: taxCalculator._id,
      oldTaxDetails,
      newTaxDetails,
      taxSavingDetails,
    });
  } catch (error) {
    // Handle errors
    console.error("Error saving tax calculation:", error);

    errorHandler(error, req, res, next);
  }
};

export const fetchHistory = async (req, res, next) => {
  try {
    const calculationId = req.params.id;
    console.log(calculationId);
    const calculationHistory = await TaxCalculator.findById(calculationId);
    const JSONcalculationHistory = {
      ...calculationHistory.toObject(), // Convert Mongoose document to plain JavaScript object
      _id: calculationHistory._id.toString(), // Convert MongoDB _id to string
    };
    console.log(JSONcalculationHistory);
    res.status(200).json({
      message: "Data fetched successfully",
      calculationHistory: JSONcalculationHistory,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
};
