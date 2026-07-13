import * as Yup from "yup";

// Regex for Pakistani phone formats (Matches +923xxxxxxxxx, 923xxxxxxxxx, 03xxxxxxxxx)
const phoneRegExp = /^((\+92)|(92)|(0))3\d{2}-?\d{7}$/;

const addNewLeadValidations = Yup.object({
  leadName: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Lead Name is required"),
    
  phoneNumber: Yup.string()
    .matches(phoneRegExp, "Phone number must be a valid Pakistani number (e.g. +923011234567)")
    .required("Phone Number is required"),
    
  whatsAppNumber: Yup.string()
    .matches(phoneRegExp, "WhatsApp number must be a valid Pakistani number")
    .required("WhatsApp Number is required"),
    
  emailAddress: Yup.string()
    .email("Please enter a valid email address")
    .required("Email Address is required"),
    
  leadSource: Yup.string()
    .required("Lead Source is required"),
    
  campaignName: Yup.string()
    .required("Campaign Name is required"),
    
  note: Yup.string()
    .max(500, "Note cannot exceed 500 characters")
    .nullable(), // Allows empty field without breaking
});

export default addNewLeadValidations;