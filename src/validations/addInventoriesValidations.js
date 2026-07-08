import * as Yup from "yup";

const addInventoriesValidations = Yup.object({
  project: Yup.string().required("Project is required"),
  sector: Yup.string().required("Block is required"),

  type: Yup.string().required("Type is required"),
  plotNumber: Yup.string().required("Plot Number is required"),
  number: Yup.string().required("Number is required"),
  fullNumber: Yup.string().required("Full Number is required"),
  street: Yup.string().required("Street is required"),
  approximateSize: Yup.string().required("Size is required"),
  significance: Yup.string().required("Significance is required"),
});
 
export default addInventoriesValidations;
