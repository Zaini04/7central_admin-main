import * as Yup from "yup";

const addProvisionalValidation = Yup.object({

    inventory: Yup.string()
    .required("Inventory is required"),
   bankName: Yup.string()
    .required("Bank Name is required"),
      
  chequeNo: Yup.string()
    .required("Cheque Number is required"),
  
  chequeDate: Yup.date()
    .required("Cheque Date is required")
    .typeError("Invalid date format"),
  
  amount: Yup.number()
    .required("Amount is required")
    .moreThan(0, "Amount must be greater than 0"),
  
  notes: Yup.string(), // optional
  
  files: Yup.array().of(Yup.string()), // optional array of base64 strings
  
});

export default addProvisionalValidation;
