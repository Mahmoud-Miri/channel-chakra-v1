import * as yup from "yup";

export const newApplicationFormValidationSchema = yup.object().shape({
  name: yup.string().required("This field requires a value"),
  surname: yup.string().required("This field requires a value"),
  channel: yup.string().required("This field requires a value"),
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("This field requires a value"),
  mobile: yup
    .string()
    .required("This field requires a value")
    .matches(/^\d+$/, "Must be only digits"),
  productName: yup.string().required("This field requires a value"),
  productQuantity: yup
    .number()
    .positive("Enter a positive value")
    .required("This field requires a value")
    .typeError("A numerical value is required"),
  productPrice: yup
    .number()
    .min(0, "Enter a non-negative number")
    .required("This field requires a value")
    .typeError("A numerical value is required"),
});
