import * as Yup from "yup";

const customerNotificationValidation = Yup.object({
  emailNotification: Yup.object({
    toggle: Yup.string()
      .oneOf(["on", "off"], "Please select On or Off for email notifications")
      .required("Email notification must be On or Off"),
    // preference: Yup.string()
    //   .when("toggle", {
    //     is: "on",
    //     then: (schema) =>
    //       schema
    //         .oneOf(["all", "important"], "Please select All or Important reminder")
    //         .required("Select your email notification preference"),
    //     otherwise: (schema) => schema.notRequired(),
    //   }),
  }),

  whatsAppNotification: Yup.object({
    toggle: Yup.string()
      .oneOf(["on", "off"], "Please select On or Off for WhatsApp notifications")
      .optional(),
    // preference: Yup.string().when("toggle", {
    //   is: "on",
    //   then: (schema) =>
    //     schema
    //       .oneOf(["all", "important"], "Please select All or Important reminder")
    //       .required("Select your WhatsApp notification preference"),
    //   otherwise: (schema) => schema.notRequired(),
    // }),
  }),

   textMessage: Yup.object({
    toggle: Yup.string()
      .oneOf(["on", "off"], "Please select On or Off for Text Message notifications")
      .optional(),
  //   preference: Yup.string().when("toggle", {
  //     is: "on",
  //     then: (schema) =>
  //       schema
  //         .oneOf(["all", "important"], "Please select All or Important reminder")
  //         .required("Select your Text Message notification preference"),
  //     otherwise: (schema) => schema.notRequired(),
  //   }),
  }),
});

export default customerNotificationValidation;


