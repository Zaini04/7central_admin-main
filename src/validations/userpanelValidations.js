import * as Yup from "yup";

const userpanelValidations = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters"),

  // phoneNumber: Yup.string()
  //   .required("Phone number is required")
  //   .matches(/^(03\d{2}-\d{7})$/, "Invalid phone number format (e.g. 0301-2345678)"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  // selectUser: Yup.string().required("Please select a user type"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),

  // confrimPassword: Yup.string()
  //   .oneOf([Yup.ref("password"), null], "Passwords must match")
  //   .required("Please confirm your password"),
});

export default userpanelValidations;
