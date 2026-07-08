import * as Yup from "yup";

const tranferInventoriesValidations = Yup.object({
  // Required fields
  name: Yup.string().required("Previous owner is required"),
  type: Yup.string().required("Inventory type is required"),
  newName: Yup.string().required("New owner is required"),
  documentType: Yup.string().required("Document type is required"),
  personOne: Yup.string().required("Person 1 name is required"),
  documentImage: Yup.mixed()
    .required("Document image is required"),

  // Optional fields
  personTwo: Yup.string().nullable(),
  personThree: Yup.string().nullable(),
});

export default tranferInventoriesValidations;
