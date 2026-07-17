// validations/customerGeneralValidations.js
import * as Yup from "yup";

const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
// CNIC: Only 13 digits, no hyphens
const cnicRegex = /^\d{13}$/;

const originalBuyerBValidation = Yup.object({
  image: Yup.mixed().nullable(), // optional file

  name: Yup.string()
    .required("Full name is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must not exceed 50 characters"),

  fatherName: Yup.string()
    .required("Father/Husband name is required")
    .min(2, "Must be at least 2 characters")
    .max(50, "Must not exceed 50 characters"),

  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),

  cnic: Yup.string()
    .matches(cnicRegex, "CNIC must be exactly 13 digits without hyphens")
    .required("CNIC is required"),

  passportName: Yup.string().optional(),

  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(phoneRegex, "Enter a valid phone number"),

  phoneNumber2: Yup.string()
    .optional()
    .test("is-valid-phone-2", "Enter a valid phone number", (value) => !value || phoneRegex.test(value)),

  whatsappNumber: Yup.string()
    .required("WhatsApp number is required")
    .matches(phoneRegex, "Enter a valid WhatsApp number"),

  whatsappNumber2: Yup.string()
    .optional()
    .test("is-valid-whatsapp-2", "Enter a valid WhatsApp number", (value) => !value || phoneRegex.test(value)),

  houseFlatNumber: Yup.string().optional(),

address: Yup.string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),

  address2: Yup.string().optional(),

  city: Yup.string().optional(),

  province: Yup.string().optional(),

  countryCode: Yup.string().optional(),

  countryName: Yup.string().optional(),
//   customerType:Yup.string().required("Customer tye is required")
  //  filer: Yup.string().required("Please select filer status"),
  // nttnumber: Yup.string().when("filer", {
  //   is: "Filer",
  //   then: (schema) => schema.required("NTT Number is required for filers"),
  //   otherwise: (schema) => schema.notRequired(),
  // }),
});

export default originalBuyerBValidation;
