import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Axios from "config/api";
import ToggleSwitch from "./ToggleSwitch";
import PlaceholderToolbar from "./PlaceholderToolbar";
import MultiSelect from "components/global/form/MultiSelect";
import FormControl from "components/global/form/FormControl";
import { useNavigate } from "react-router-dom";

const templateValidationSchema = Yup.object().shape({
//   key: Yup.string().required("Key is required"),
  name: Yup.string().required("Name is required"),
  category: Yup.string().required("Category is required"),
});

const insertTextAtCursor = (fieldName, valueToInsert, formik, inputRefs) => {
  const ref = inputRefs.current[fieldName];

  if (!ref) {
    const currentValue = formik.values[fieldName] || "";
    formik.setFieldValue(fieldName, `${currentValue}${valueToInsert}`);
    return;
  }

  const start = ref.selectionStart ?? 0;
  const end = ref.selectionEnd ?? 0;
  const currentValue = formik.values[fieldName] || "";

  const newValue =
    currentValue.slice(0, start) +
    valueToInsert +
    currentValue.slice(end);

  formik.setFieldValue(fieldName, newValue);

  setTimeout(() => {
    ref.focus();
    const cursorPos = start + valueToInsert.length;
    ref.setSelectionRange(cursorPos, cursorPos);
  }, 0);
};

const NotificationTemplateForm = () => {
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef({});
  const navigate = useNavigate();

  const initialValues = {
    key: "",
    name: "",
    category: "",
    emailEnabled: true,
    smsEnabled: true,
    whatsappEnabled: true,
    emailSubject: "",
    emailBody: "",
    smsBody: "",
    whatsappBody: "",
    description: "",
    isActive: true,
  };

  const submitHandler = async (values, { resetForm }) => {
    try {
      setLoading(true);
      if(values.key===""){
        values.key = values.category;
      }
      await Axios.post("/notification-templates", values);
      resetForm();
      navigate("/app/notification-templates");
    //   window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message || "Failed to create template");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border-b">
      <h3 className="text-lg font-semibold mb-4">Create Notification Template</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={templateValidationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <Form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* <div>
                <label className="font-medium">Template Key</label>
                <Field
                  name="key"
                  className="w-full border rounded-lg p-3 mt-1"
                  placeholder="payment_confirmation"
                />
              </div> */}

              <div>
                <label className="font-medium">Template Name</label>
                <Field
                  name="name"
                  className="w-full border rounded-lg p-3 mt-1"
                  placeholder="Payment Confirmation"
                />
              </div>

            <div>
              <label className="font-medium">Category</label>
              <FormControl
                control="multiple-option"   // ✅ IMPORTANT (not multiple-option)
                // label="Category"
                name="category"
                            formik={formik}
                            options={[
                                "",
                                "payment_confirmation",
                                "before_due_reminder",
                                "due_date_reminder",
                                "overdue_reminder",
                                "news",
                                "marketing",
                                "alert"
                            ]}
                            />
                        
            </div>
              {/* Category as MultiSelect */}
             
            </div>

            <PlaceholderToolbar
              onInsert={(token) =>
                insertTextAtCursor("emailSubject", token, formik, inputRefs)
              }
              title="Click to insert variables into subject/body fields"
            />

            <div>
              <label className="font-medium">Email Subject</label>
              <input
                ref={(el) => (inputRefs.current.emailSubject = el)}
                name="emailSubject"
                value={formik.values.emailSubject}
                onChange={formik.handleChange}
                className="w-full border rounded-lg p-3 mt-1"
                placeholder="Payment Confirmation – [Project]"
              />
            </div>

            <div>
              <label className="font-medium">Email Body</label>
              <PlaceholderToolbar
                onInsert={(token) =>
                  insertTextAtCursor("emailBody", token, formik, inputRefs)
                }
                title="Insert variables into email body"
              />
              <textarea
                ref={(el) => (inputRefs.current.emailBody = el)}
                name="emailBody"
                rows={7}
                value={formik.values.emailBody}
                onChange={formik.handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Dear [Client Name], ..."
              />
            </div>

            <div>
              <label className="font-medium">SMS Body</label>
              <PlaceholderToolbar
                onInsert={(token) =>
                  insertTextAtCursor("smsBody", token, formik, inputRefs)
                }
                title="Insert variables into SMS body"
              />
              <textarea
                ref={(el) => (inputRefs.current.smsBody = el)}
                name="smsBody"
                rows={5}
                value={formik.values.smsBody}
                onChange={formik.handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="[Project] confirms that Rs. [Amount] ..."
              />
            </div>

            <div>
              <label className="font-medium">WhatsApp Body</label>
              <PlaceholderToolbar
                onInsert={(token) =>
                  insertTextAtCursor("whatsappBody", token, formik, inputRefs)
                }
                title="Insert variables into WhatsApp body"
              />
              <textarea
                ref={(el) => (inputRefs.current.whatsappBody = el)}
                name="whatsappBody"
                rows={5}
                value={formik.values.whatsappBody}
                onChange={formik.handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="[Project] confirms that Rs. [Amount] ..."
              />
            </div>

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

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-6 py-3 rounded-xl"
              >
                {loading ? "Saving..." : "Save Template"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NotificationTemplateForm;