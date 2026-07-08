import * as Yup from "yup";

const uplaodInventoryValidation = Yup.object({
  // project: Yup.string().trim().required("Project is required"),
  // sector: Yup.string().trim().required("Sector is required"),
  file: Yup.mixed().required("File is required"),
});

export default uplaodInventoryValidation;
