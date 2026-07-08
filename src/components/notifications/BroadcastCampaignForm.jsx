import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "config/api";
import ToggleSwitch from "./ToggleSwitch";
import MultiCustomerSelect from "components/assignInventory/assignInventoryInput/MultiCustomerSelect";
import FormControl from "components/global/form/FormControl";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  audienceType: Yup.string().required("Audience type is required"),
  emailSubject: Yup.string().nullable(),
  emailBody: Yup.string().nullable(),
  smsBody: Yup.string().nullable(),
  whatsappBody: Yup.string().nullable(),
  customers:Yup.array().when("audienceType", {
  is: "selected",
  then: (schema) =>
    schema.min(1, "Select at least one customer"),
  otherwise: (schema) => schema.notRequired(),
}),
});

const BroadcastCampaignForm = () => {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    category: "alert",
    audienceType: "all",
    customers: [],
    emailEnabled: true,
    smsEnabled: false,
    whatsappEnabled: false,
    emailSubject: "",
    emailBody: "",
    smsBody: "",
    whatsappBody: "",
  };

  const submitHandler = async (values, { resetForm }) => {
    try {
      setLoading(true);

      const payload = {
        ...values,
        customers:
          values.audienceType === "selected"
            ? values.customers.map((c) => c._id)
            : [],   
        
      };

      await Axios.post("/broadcast-campaigns", payload);
      resetForm();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-4">Create Broadcast Campaign</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="font-medium">Title</label>
                <Field
                  name="title"
                  className="w-full bg-white border rounded-lg p-3 mt-1"
                  placeholder="Urgent Payment Alert"
                />
              </div>

               <div>
              <label className="font-medium">Category</label>
              <FormControl
                control="multiple-option"  
                name="category"
                            formik={formik}
                            options={[
                                "",
                                "news",
                                "marketing",
                                "alert"
                            ]}
                            />
            </div>

             
              <div>
                <label className="font-medium">Audience Type</label>
                <Field
                  as="select"
                  name="audienceType"
                  className="w-full !bg-white  border rounded-lg p-3 mt-1 "
                >
                  <option value="all">All Customers</option>
                  <option value="selected">Selected Customers</option>
                </Field>
              </div>
            </div>

          {formik.values.audienceType === "selected" && (
            <div className="sm:col-span-2">
                <MultiCustomerSelect
                label="Customer"
                name="customers"
                selectedCustomers={formik.values.customers}
                onChange={(newValue) =>
                    formik.setFieldValue("customers", newValue)
                }
                error={formik.touched.customers && formik.errors.customers}
                />
            </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium">Email Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.emailEnabled}
                  onChange={() =>
                    formik.setFieldValue("emailEnabled", !formik.values.emailEnabled)
                  }
                />
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium">SMS Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.smsEnabled}
                  onChange={() =>
                    formik.setFieldValue("smsEnabled", !formik.values.smsEnabled)
                  }
                />
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium">WhatsApp Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.whatsappEnabled}
                  onChange={() =>
                    formik.setFieldValue(
                      "whatsappEnabled",
                      !formik.values.whatsappEnabled
                    )
                  }
                />
              </div>
            </div>

            <div>
              <label className="font-medium">Email Subject</label>
              <Field
                name="emailSubject"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Important notice from The Prestige"
              />
            </div>

            <div>
              <label className="font-medium">Email Body</label>
              <Field
                as="textarea"
                rows={5}
                name="emailBody"
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Dear Customer..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium">SMS Body</label>
                <Field
                  as="textarea"
                  rows={4}
                  name="smsBody"
                  className="w-full border rounded-lg p-3 mt-1"
                  placeholder="Short SMS message"
                />
              </div>

              <div>
                <label className="font-medium">WhatsApp Body</label>
                <Field
                  as="textarea"
                  rows={4}
                  name="whatsappBody"
                  className="w-full border rounded-lg p-3 mt-1"
                  placeholder="WhatsApp message"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Saving..." : "Save Campaign"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BroadcastCampaignForm;