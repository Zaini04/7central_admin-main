import * as Yup from "yup";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;

const applicantSchema = Yup.object({
  ApplicantName: Yup.string()
    .required("Applicant name is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must not exceed 50 characters"),

  LastName: Yup.string()
    .required("Last name is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must not exceed 50 characters"),

  CNIC: Yup.string().required("CNIC or NICOP number is required"),

  passportNumber: Yup.string().required("Passport number is required"),

  phonenumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  houseFlatNumber: Yup.string().required("House/Flat number is required"),
  address1: Yup.string().required("Address is required"),
  address2: Yup.string().optional(),

  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
});

// ✅ Validation for an array of applicants
const jointValidations = Yup.object({
  customers: Yup.array().of(applicantSchema).min(1, "At least one applicant is required"),
});

export default jointValidations;
