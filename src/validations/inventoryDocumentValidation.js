import * as Yup from "yup";

const inventoryDocumentValidation = Yup.object({
  name: Yup.string()
    .trim()
    .required("Document name is required"),

  type: Yup.string().required("Please select a document type"),

  attachments: Yup.mixed().when("type", {
    is: "Cnic",
    then: (schema) => schema.required("Attachments are required for CNIC"),
    otherwise: (schema) => schema.notRequired(),
  }),


    others: Yup.string().when("type", {
    is: "Other",
    then: (schema) => schema.required("Note is required"),
    otherwise: (schema) => schema.notRequired(),
  }),


  image: Yup.mixed().when("type", {
    is: (val) => val && val !== "Cnic",
    then: (schema) => schema.required("Document image is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export default inventoryDocumentValidation;
