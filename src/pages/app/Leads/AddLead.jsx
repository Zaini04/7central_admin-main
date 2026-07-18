import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormControl from "components/global/form/FormControl";
import SelectInput from "components/global/form/SelectInput"; // Using your global text select input
import CancelButton from "components/global/form/CancelButton";
import NextButton from "components/global/form/NextButton";
import BackButton from "components/global/form/BackButton";
import addNewLeadValidations from "validations/addNewLeadValidations";

// Exact initial values matching the "Add New Lead" form layout
const initValues = {
  userName: "",
  phoneNumber: "",
  whatsAppNumber: "",
  emailAddress: "",
  leadSource: "",
  campaignName: "",
  dealerType:"",
  dealerName:"",
  note: "",
};

const AddNewLead = () => {
  const navigate = useNavigate();

  // Mapped options directly from the dropdown visual in your image
  const leadSourceOptions = [
    "Campaign",
    "Google Ads/Search",
    "Dealer",
    "Walking Customer"
  ];

    const DealorTypeOptions = [
    "DHA Registered",
    "7Central Registered",
    "Freelance Registered",
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Page Title placed outside/above the main white content container */}
      <div className=" flex justify-between items-center">
      <h2 className="page-heading">Add New Lead</h2>
      <button
      onClick={()=>navigate('/app/leads')}
      >

<BackButton/>
      </button>
      </div>

      <div className="w-full bg-white flex flex-col gap-6 px-6 pt-6 pb-6 rounded-xl shadow-sm border border-gray-100">
        <Formik
          initialValues={initValues}
            validationSchema={addNewLeadValidations}
         onSubmit={async (values, { setSubmitting, resetForm }) => {
  try {
    // 1. Ek clean object banayein jo sirf valid field data agay bheje
    const cleanedValues = {
      userName: values.userName,
      phoneNumber: values.phoneNumber,
      whatsAppNumber: values.whatsAppNumber,
      emailAddress: values.emailAddress,
      leadSource: values.leadSource,
      note: values.note,
      // Agar Campaign select hua hai toh sirf campaignName bhejein
      campaignName: values.leadSource === "Campaign" ? values.campaignName : "",
      // Agar Dealer select hua hai toh dealer fields bhejein, warna empty bhejein
      dealerType: values.leadSource === "Dealer" ? values.dealerType : "",
      dealerName: values.leadSource === "Dealer" ? values.dealerName : "",
    };

    // 2. Testing k liye console check karein, ab kachra values gayab ho chuki hain
    console.log("Cleaned Lead Values:", cleanedValues);

    // const res = await Axios.post("/leads", cleanedValues);
    
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
              <div>
              <p className="text-sm font-bold text-gray-800  border-gray-100 pb-4 ">
                Lead Information
              </p>
      <hr className="w-[100%] h-[1.5px]  mx-auto bg-[#9A9A9A]" />
</div>
              {/* 3-Column Inputs Layout Grid */}
              <div className=" mt-4 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                
                {/* Lead Name */}
                <FormControl
                  control="input"
                  label="User Name"
                  name="userName"
                  placeholder="Enter user name"
                  formik={formik}
                />

                {/* Phone Number */}
                <FormControl
                  control="input"
                  label="Phone Number"
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  formik={formik}
                />

                {/* WhatsApp Number */}
                <FormControl
                  control="input"
                  label="WhatsApp Number"
                  name="whatsAppNumber"
                  placeholder="Enter whatsapp number"
                  formik={formik}
                />

                {/* Email Address */}
                <FormControl
                  control="input"
                  type="email"
                  label="Email"
                  name="emailAddress"
                  placeholder="Enter gmail"
                  formik={formik}
                />
                <FormControl
                  control="multiple-option"
                  label="Lead Source"
                    name="leadSource"
                  placeholder="Select lead source"
                    options={leadSourceOptions}
                 
                  formik={formik}

  //                    onChange={(e) => {
  //   const value = e.target.value;
  //   formik.setFieldValue("leadSource", value);
    
  //   // Yahan state ko clean karein
  //   if (value !== "Campaign") {
  //     formik.setFieldValue("campaignName", "");
  //   }
  //   if (value !== "Dealer") {
  //     formik.setFieldValue("dealerType", "");
  //     formik.setFieldValue("dealerName", "");
  //   }
  // }}
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


{
  formik.values.leadSource === "Campaign" && (
<FormControl
                  control="input"
                  label="Campaign Name"
                  name="campaignName"
                  placeholder="Enter campaign name"
                  formik={formik}
                />
  )
}
{
  formik.values.leadSource === "Dealer" && (
    <>
<FormControl
                  control="multiple-option"
                  label="Dealer Type"
                    name="dealerType"
                  placeholder="Select dealer type"
                    options={DealorTypeOptions}
                  formik={formik}
                />
<FormControl
                  control="input"
                  label="Dealer Name"
                  name="dealerName"
                  placeholder="Enter dealer name"
                  formik={formik}
                />

                </>
  )
}


                

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