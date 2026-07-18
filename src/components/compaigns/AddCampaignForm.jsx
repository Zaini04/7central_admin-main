import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";

import FormControl from "components/global/form/FormControl";
import ClearButton from "components/global/form/ClearButton";
import NextButton from "components/global/form/NextButton";

// Dropdown input components mapped exactly as per system inputs standard
import SelectInput from "components/global/form/SelectInput"; 
import addNewCampaignValidations from "validations/addCampaignValidations";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campaign Name is required"),
  campaignType: Yup.string().required("Campaign Type is required"),
  targetAudience: Yup.string().required("Target Audience is required"),
  period: Yup.string().required("Period selection is required"),
  frequency: Yup.string().required("Frequency selection is required"),
  description: Yup.string().nullable(),
  files: Yup.array(),
});

const initValues = {
  name: "",
  campaignType: "",
  targetAudience: "",
  period: "",
  frequency: "",
  description: "",
  files: [],
};

const AddNewCampaignForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Static status tracking loaders matching project standard state configuration
  const createLoading = false; 

  const campaignTypeOptions = [
    { label: "Public Relations", value: "public_relations" },
    { label: "Brand", value: "brand" },
    { label: "Media", value: "media" },
  ];

  const periodOptions = [
    { label: "Day", value: "day" },
    { label: "Weekly", value: "weekly" },
    { label: "Monthly", value: "monthly" },
  ];

  const validateForm = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });
      return {};
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
        toast.error(e.message);
      });
      return errors;
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    const errors = await validateForm(values);
    if (Object.keys(errors).length > 0) return;

    try {
      const formattedValues = {
        name: values.name,
        campaignType: values.campaignType,
        targetAudience: values.targetAudience,
        period: values.period,
        frequency: values.frequency,
        description: values.description || "",
        files: values.files || [],
      };

      console.log("Submitted Campaign payload:", formattedValues);
      // Action dispatch logic goes here
      // dispatch(create_campaign(formattedValues, navigate));
      
      toast.success("Campaign added successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting campaign:", error);
      toast.error("Something went wrong while submitting");
    }
  };

  return (
    <div className=" w-full flex flex-col gap-6 px-3 pb-4">
      <Formik initialValues={initValues} validationSchema={addNewCampaignValidations} onSubmit={handleSubmit}>
        {(formik) => (
          <Form className="flex flex-col gap-6">
            <div className="flex flex-col gap-5 px-3 w-full">
              <p className="form-title">Campaign Details</p>
              <hr className="w-[100%] h-[1.5px] mx-auto bg-[#9A9A9A]" />

              {/* Main Fields Layout Row */}
              <div className="mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                <FormControl
                  control="input"
                  type="text"
                  label="Name"
                  placeholder="UBL"
                  name="name"
                  formik={formik}
                  autoComplete="off"
                  spellCheck={false}
                />
                <FormControl
                  control="multiple-option"
                  label="Campaign Type"
                  placeholder="Select Campaign Type"
                  name="campaignType"
                  formik={formik}
                                      options={campaignTypeOptions.map(opt => opt.label)}

                />

                {/* <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1F2020]">Campaign Type</label>
                  <SelectInput
                    name="campaignType"
                    placeholder="-----"
                    options={campaignTypeOptions.map(opt => opt.label)}
                    onSelect={(val) => {
                      const found = campaignTypeOptions.find(o => o.label === val);
                      formik.setFieldValue("campaignType", found ? found.value : val);
                    }}
                  />
                </div> */}

                <FormControl
                  control="input"
                  type="text"
                  label="Target Audience"
                  placeholder="GB"
                  name="targetAudience"
                  formik={formik}
                  autoComplete="off"
                />
                <FormControl
                  control="multiple-option"
                  label="Period "
                  placeholder="Select Period"
                    name="period"
                  formik={formik}
                                      options={periodOptions.map(opt => opt.label)}


                />

                {/* <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#1F2020]">Period</label>
                  <SelectInput
                    name="period"
                    placeholder="08"
                    options={periodOptions.map(opt => opt.label)}
                    onSelect={(val) => {
                      const found = periodOptions.find(o => o.label === val);
                      formik.setFieldValue("period", found ? found.value : val);
                    }}
                  />
                </div> */}

                {/* Optional additional field wrapper to maintain grid balance alignment */}
                <FormControl
                  control="input"
                  type="text"
                  label="Frequency Status"
                  placeholder="Enter Frequency"
                  name="frequency"
                  formik={formik}
                />
              </div>
                <div className="mt-4">

              <FormControl
                control="textarea"
                type="text"
                label="Description"
                placeholder="---------"
                name="description"
                formik={formik}
              />
                </div>

              {/* File Dropzone Uploader Control matching the project form layouts */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <p className="text-[13px] px-1 pointer-events-none text-gray3">Attachment</p>
                <FormControl
                  control="multi-file-base64"
                  label="Choose a file or drag & drop it here"
                  name="files"
                  formik={formik}
                />
              </div>
            </div>

            {/* Bottom Action Control Bar */}
            <div className="px-3 w-full flex justify-end mt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="w-fit"
                  onClick={() => formik.resetForm()}
                >
                  <ClearButton />
                </button>
                
                <button
                  type="submit"
                  className="w-fit"
                  disabled={createLoading}
                >
                  <NextButton label="Add Campaign" createLoading={createLoading} isIcon={false} />
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddNewCampaignForm;