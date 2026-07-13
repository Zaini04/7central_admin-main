import * as Yup from "yup";

const addNewCampaignValidations = Yup.object().shape({
  name: Yup.string()
    .min(3, "Campaign Name must be at least 3 characters long")
    .required("Campaign Name is required"),
    
  campaignType: Yup.string()
    .required("Campaign Type is required"),
    
  targetAudience: Yup.string()
    .required("Target Audience is required"),
    
  period: Yup.string()
    .required("Period selection is required"),
    
  frequency: Yup.string()
    .required("Frequency selection is required"),
    
  description: Yup.string()
    .max(500, "Description cannot exceed 500 characters")
    .nullable(),
    
  files: Yup.array()
    .nullable(),
});

export default addNewCampaignValidations;