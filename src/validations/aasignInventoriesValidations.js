import * as Yup from "yup";

const assignInventoriesValidations = Yup.object({
  project: Yup.string().required("Project is required"),
  block: Yup.string().required("Block is required"),
  inventory: Yup.string().required("Inventory is required"),
  applicant: Yup.string().required("Applicant is required"),
singleCustomer: Yup.string().required("Customer is required"),
name: Yup.array()
  .min(1, "Please select at least one customer")
  .of(Yup.string().required()),
 
});

export default assignInventoriesValidations;
