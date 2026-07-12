import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormControl from "components/global/form/FormControl";
import SelectInput from "components/global/form/SelectInput"; // Using your global text select input
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";
import BackButton from "components/global/form/BackButton";

// Exact initial values matching the "Add New Lead" form layout
const initValues = {
  leadName: "",
  phoneNumber: "",
  whatsAppNumber: "",
  emailAddress: "",
  leadSource: "",
  campaignName: "",
  note: "",
};

const AddNewLead = () => {
  const navigate = useNavigate();

  // Mapped options directly from the dropdown visual in your image
  const leadSourceOptions = [
    "Meta Campaign",
    "Google Ads/Search",
    "Dealer",
    "Walking Customer"
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Page Title placed outside/above the main white content container */}
      <div className=" flex justify-between items-center">
      <h2 className="page-heading">Add New Lead</h2>
<BackButton/>
      </div>

      <div className="w-full bg-white flex flex-col gap-6 px-6 pt-6 pb-6 rounded-xl shadow-sm border border-gray-100">
        <Formik
          initialValues={initValues}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              // Replace with your endpoint logic when connecting backend APIs
              // const res = await Axios.post("/leads", values);
              
              toast.success("Lead created successfully");
              resetForm();
              navigate("/app/leads");
            } catch (err) {
              toast.error(err?.response?.data?.msg || err.message || "Failed to add lead");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <Form className="flex flex-col gap-6">
              {/* Internal Card Sub-Section Heading */}
              <p className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2">
                Lead Information
              </p>

              {/* 3-Column Inputs Layout Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                
                {/* Lead Name */}
                <FormControl
                  control="input"
                  label="Lead Name"
                  name="leadName"
                  placeholder="Martin Lewis"
                  formik={formik}
                />

                {/* Phone Number */}
                <FormControl
                  control="input"
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="+92-301-1234567"
                  formik={formik}
                />

                {/* WhatsApp Number */}
                <FormControl
                  control="input"
                  label="WhatsApp Number"
                  name="whatsAppNumber"
                  placeholder="+92-301-1234567"
                  formik={formik}
                />

                {/* Email Address */}
                <FormControl
                  control="input"
                  type="email"
                  label="Email Address"
                  name="emailAddress"
                  placeholder="user@gmail.com"
                  formik={formik}
                />
                <FormControl
                  control="multiple-option"
                  label="Select LeadSource"
                    name="leadSource"
                  placeholder="Facebook Campaign"
                    options={leadSourceOptions}
                  formik={formik}
                />

                {/* Lead Source (Select Dropdown) */}
                {/* <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-700">Lead Source</label>
                  <SelectInput
                    name="leadSource"
                    placeholder="Facebook Campaign"
                    options={leadSourceOptions}
                    onSelect={(val) => formik.setFieldValue("leadSource", val)}
                  />
                </div> */}

                {/* Campaign Name */}
                <FormControl
                  control="input"
                  label="Campaign Name"
                  name="campaignName"
                  placeholder="15% Down Payment Offer"
                  formik={formik}
                />

                {/* Note Field - Spans all columns at the bottom */}
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <FormControl
                    control="textarea"
                    label="Note"
                    name="note"
                    placeholder="........."
                    formik={formik}
                    rows={4}
                  />
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="w-full flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    formik.resetForm();
                    navigate(-1);
                  }}
                  disabled={formik.isSubmitting}
                >
                  <CancelButton/>
                </button>

                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  <NextButton label= {formik.isSubmitting ? "Saving..." : "Save Lead"}
  createLoading={formik.isSubmitting} isIcon={false}
/>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddNewLead;