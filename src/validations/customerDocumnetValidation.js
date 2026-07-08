import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const customerDocumentValidation = Yup.object({
  name: Yup.string()
    .trim()
    .required("Document name is required"),

  type: Yup.string()
    .required("Please select a document type"),

  image: Yup.mixed()
    .required("Document image is required"),
});

export default customerDocumentValidation;
