import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "config/api";
import ToggleSwitch from "./ToggleSwitch";
import MultiCustomerSelect from "components/assignInventory/assignInventoryInput/MultiCustomerSelect";
import FormControl from "components/global/form/FormControl";
import NextButton from "components/global/form/NextButton";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  category: Yup.string().required("Category is required"),
  audienceType: Yup.string().required("Audience type is required"),
  emailSubject: Yup.string().nullable(),
  emailBody: Yup.string().nullable(),
  smsBody: Yup.string().nullable(),
  whatsappBody: Yup.string().nullable(),
  customers: Yup.array().when("audienceType", {
    is: "selected",
    then: (schema) => schema.min(1, "Select at least one customer"),
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
    <div className="p-4 rounded-xl">
      <h3 className="text-dark1 font-semibold mb-4">
        Create Broadcast Campaign
      </h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-3">
              <div className="space-y-0.5">
                <label className="font-medium text-xs">Title</label>
                <Field
                  name="title"
                  className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                  placeholder="Urgent Payment Alert"
                />
              </div>

              <div className="space-y-0.5">
                <label className="font-medium text-xs">Category</label>
                <FormControl
                  control="multiple-option"
                  name="category"
                  formik={formik}
                  options={["", "news", "marketing", "alert"]}
                />
              </div>

              <div className="space-y-0.5">
                <label className="font-medium text-xs">Audience Type</label>
                <Field
                  as="select"
                  name="audienceType"
                  className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                >
                  <option value="all">All Customers</option>
                  <option value="selected">Selected Customers</option>
                </Field>
              </div>
            </div>

            {formik.values.audienceType === "selected" && (
              <div className="sm:col-span-2 mt-4">
                <MultiCustomerSelect
                  label="Customer"
                  name="customers"
                  placeholder="Select Customer"
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
                <span className="font-medium text-sm">Email Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.emailEnabled}
                  onChange={() =>
                    formik.setFieldValue(
                      "emailEnabled",
                      !formik.values.emailEnabled,
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium text-sm">SMS Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.smsEnabled}
                  onChange={() =>
                    formik.setFieldValue(
                      "smsEnabled",
                      !formik.values.smsEnabled,
                    )
                  }
                />
              </div>

              <div className="border rounded-xl p-4 flex items-center justify-between">
                <span className="font-medium text-sm">WhatsApp Enabled</span>
                <ToggleSwitch
                  enabled={formik.values.whatsappEnabled}
                  onChange={() =>
                    formik.setFieldValue(
                      "whatsappEnabled",
                      !formik.values.whatsappEnabled,
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-0.5">
              <label className="font-medium text-xs">Email Subject</label>
              <Field
                name="emailSubject"
          className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                placeholder="Important notice from The Prestige"
              />
            </div>

            <div>
              <label className="font-medium text-sm">Email Body</label>
              <Field
                as="textarea"
                rows={5}
                name="emailBody"
          className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                placeholder="Dear Customer..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-medium text-sm">SMS Body</label>
                <Field
                  as="textarea"
                  rows={4}
                  name="smsBody"
          className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                  placeholder="Short SMS message"
                />
              </div>

              <div>
                <label className="font-medium text-sm">WhatsApp Body</label>
                <Field
                  as="textarea"
                  rows={4}
                  name="whatsappBody"
          className="w-full border border-lighter focus:border-dark1 transition-all bg-transparent py-1.5 px-4 text-sm   text-primary rounded-lg outline-none cursor-pointer"
                  placeholder="WhatsApp message"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className=""
              >
                <NextButton label={loading ? "Saving..." : "Save Template"} isIcon={false} />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BroadcastCampaignForm;
