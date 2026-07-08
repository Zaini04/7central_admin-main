import * as Yup from "yup";

const castValidations = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(2, "Username must be at least 2 characters long")
    .max(50, "Username must not exceed 50 characters"),
  email: Yup.string()
    .email("Please enter valid email address")
    .required("Email is required."),

  password: Yup.string()
    .min(8, "Password should have at least 8 characters")
    .required("Password is required"),
});

export default castValidations;
