import * as Yup from "yup";

const addNewLeadValidations = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .required("User name is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number format")
    .min(7, "Phone number is too short")
    .required("Phone number is required"),

  whatsAppNumber: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, "Invalid WhatsApp number format")
    .nullable(), // Kept optional as standard practice unless you want to make it required

  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),

  leadSource: Yup.string()
    .oneOf(["Campaign", "Google Ads/Search", "Dealer", "Walking Customer"], "Invalid Lead Source")
    .required("Lead source is required"),

  // Conditional field: Required only if leadSource is "Campaign"
  campaignName: Yup.string().when("leadSource", {
    is: "Campaign",
    then: (schema) => schema.trim().required("Campaign name is required"),
    otherwise: (schema) => schema.strip(), // strips the field value out if not relevant
  }),

  // Conditional field: Required only if leadSource is "Dealer"
  dealerType: Yup.string().when("leadSource", {
    is: "Dealer",
    then: (schema) =>
      schema
        .oneOf(["DHA Registered", "7Central Registered", "Freelance Registered"], "Invalid Dealer Type")
        .required("Dealer type is required"),
    otherwise: (schema) => schema.strip(),
  }),

  // Conditional field: Required only if leadSource is "Dealer"
  dealerName: Yup.string().when("leadSource", {
    is: "Dealer",
    then: (schema) => schema.trim().required("Dealer name is required"),
    otherwise: (schema) => schema.strip(),
  }),

  note: Yup.string()
    .max(500, "Note cannot exceed 500 characters")
    .nullable(),
});

export default addNewLeadValidations;