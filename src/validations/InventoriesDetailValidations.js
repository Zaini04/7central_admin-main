import * as Yup from "yup";

const InventoriesDetailValidations = Yup.object({
  // Optional text fields
  project: Yup.string().optional(),
  sector: Yup.string().optional(),
  plotNumber: Yup.string().optional(),
  number: Yup.string().optional(),
  fullNumber: Yup.string().optional(),
  street: Yup.string().optional(),
  approximate: Yup.string().optional(),
  significance: Yup.string().optional(),
  actualPrice: Yup.string().optional(),
  sellingPrice: Yup.string().optional(),
  downPayment: Yup.string().optional(),
  allocation: Yup.string().optional(),
  confirmation: Yup.string().optional(),
  onPossession: Yup.string().optional(),
  customerName: Yup.string().optional(),
  Cnic: Yup.string().optional(),

  // Optional but validated if entered
phoneNumber: Yup.string()
  .optional()
  .matches(/^\+?[0-9\-]{7,20}$/, "Enter a valid phone number"),


  email: Yup.string()
    .optional()
    .email("Invalid email address"),
});

export default InventoriesDetailValidations;
