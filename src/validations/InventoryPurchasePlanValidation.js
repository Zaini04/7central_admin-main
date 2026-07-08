import * as Yup from "yup";

const installmentCategories = [
  "1 Year Installment",
  "2 Year Installment",
  "3 Year Installment",
];

export const InventoryPurchasePlanValidation = Yup.object({

  // --------------------------
  // CATEGORY
  // --------------------------
  category: Yup.string().required("Category is required"),

  // --------------------------
  // FULL PAYMENT
  // --------------------------
  fullPayment: Yup.number()
    .typeError("Full Payment must be a number")
    .when("category", {
      is: "Full Payment",
      then: (schema) =>
        schema
          .required("Full Payment is required")
          .moreThan(0, "Full Payment must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  // --------------------------
  // INSTALLMENT MAIN FIELDS
  // --------------------------
  downPayment: Yup.number()
    .typeError("Down Payment must be a number")
    .when("category", {
      is: (cat) => installmentCategories.includes(cat),
      then: (schema) =>
        schema
          .required("Down Payment is required")
          .moreThan(0, "Down Payment must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  allocation: Yup.number()
    .typeError("Allocation must be a number")
    .when("category", {
      is: (cat) => installmentCategories.includes(cat),
      then: (schema) =>
        schema
          .required("Allocation is required")
          .moreThan(0, "Allocation must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  confirmation: Yup.number()
    .typeError("Confirmation must be a number")
    .when("category", {
      is: (cat) => installmentCategories.includes(cat),
      then: (schema) =>
        schema
          .required("Confirmation is required")
          .moreThan(0, "Confirmation must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  possession: Yup.number()
    .typeError("Possession must be a number")
    .when("category", {
      is: (cat) => installmentCategories.includes(cat),
      then: (schema) =>
        schema
          .required("Possession is required")
          .moreThan(0, "Possession must be greater than 0"),
      otherwise: (schema) => schema.notRequired(),
    }),

  // --------------------------
  // QUARTERLY
  // --------------------------
  quarterlyInstallment: Yup.string().nullable(),
  quarterlyInstallmentsDuration: Yup.string().nullable(),
  quarterlyDurationAmount: Yup.string().nullable(),
  quarterlyStartDate: Yup.date().nullable(),

  quarterlyGroup: Yup.string().test(
    "quarterly-validation",
    "Quarterly section must be completely filled",
    function () {
      const {
        quarterlyInstallment,
        quarterlyInstallmentsDuration,
        quarterlyDurationAmount,
      } = this.parent;

      const hasAny =
        quarterlyInstallment ||
        quarterlyInstallmentsDuration ||
        quarterlyDurationAmount;

      if (!hasAny) return true; // all empty → OK

      // any filled → all required
      return (
        quarterlyInstallment &&
        quarterlyInstallmentsDuration &&
        quarterlyDurationAmount
      );
    }
  ),

  // --------------------------
  // MONTHLY
  // --------------------------
  monthlyInstallment: Yup.string().nullable(),
  monthlyInstallmentsDuration: Yup.string().nullable(),
  monthlyDurationAmount: Yup.string().nullable(),
  monthlyStartDate: Yup.date().nullable(),

  monthlyGroup: Yup.string().test(
    "monthly-validation",
    "Monthly section must be completely filled",
    function () {
      const {
        monthlyInstallment,
        monthlyInstallmentsDuration,
        monthlyDurationAmount,
      } = this.parent;

      const hasAny =
        monthlyInstallment ||
        monthlyInstallmentsDuration ||
        monthlyDurationAmount;

      if (!hasAny) return true;

      return (
        monthlyInstallment &&
        monthlyInstallmentsDuration &&
        monthlyDurationAmount
      );
    }
  ),

  // --------------------------
  // YEARLY
  // --------------------------
  yearlyInstallment: Yup.string().nullable(),
  yearlyInstallmentDuration: Yup.string().nullable(),
  yearlyDurationAmount: Yup.string().nullable(),
  yearlyStartDate: Yup.date().nullable(),

  yearlyGroup: Yup.string().test(
    "yearly-validation",
    "Yearly section must be completely filled",
    function () {
      const {
        yearlyInstallment,
        yearlyInstallmentDuration,
        yearlyDurationAmount,
      } = this.parent;

      const hasAny =
        yearlyInstallment ||
        yearlyInstallmentDuration ||
        yearlyDurationAmount;

      if (!hasAny) return true;

      return (
        yearlyInstallment &&
        yearlyInstallmentDuration &&
        yearlyDurationAmount
      );
    }
  ),
});

export default InventoryPurchasePlanValidation;
