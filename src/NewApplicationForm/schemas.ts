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
  products: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("This field requires a value"),
        quantity: yup
          .number()
          .required("This field requires a value")
          .positive("Enter a positive value")
          .typeError("A numerical value is required"),
        price: yup
          .number()
          .required("This field requires a value")
          .min(0, "Enter a non-negative number")
          .typeError("A numerical value is required"),
      })
    )
    .required("This field requires a value"),
});
