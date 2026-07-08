import * as Yup from "yup";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const passwordValidations = Yup.object({
  oldPassword: Yup.string()
    .required("Old password is required")
    .min(8, "Password must be at least 8 characters long"),

  newPassword: Yup.string()
    .required("New password is required")
    .min(8, "Password must be at least 8 characters long"),

  confrimPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

export default passwordValidations;
