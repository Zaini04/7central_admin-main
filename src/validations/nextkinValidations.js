import * as Yup from "yup";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const cnicRegex = /^\d{13}$/;

const nextkinValidations = Yup.object({
   name: Yup.string()
    .required("Applicant name is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must not exceed 50 characters"),
   fatherName: Yup.string()
    .required("Applicant name is required")
    .min(2, "Must be at least 2 characters")
    .max(100, "Must not exceed 50 characters"),

//   LastName: Yup.string()
//     .required("Last name is required")
//     .min(2, "Must be at least 2 characters")
//     .max(50, "Must not exceed 50 characters"),

  cnic: Yup.string()
    .matches(cnicRegex, "CNIC must be exactly 13 digits without hyphens")
    .required("CNIC is required"),

  passportNumber: Yup.string().optional(),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

    
      houseFlatNumber: Yup.string().optional(),
    
address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
    
      address2: Yup.string().optional(),
    
      city: Yup.string().optional(),
    
      province: Yup.string().optional(),
    
      countryCode: Yup.string().optional(),
    
      countryName: Yup.string().optional(),
});

export default nextkinValidations;
