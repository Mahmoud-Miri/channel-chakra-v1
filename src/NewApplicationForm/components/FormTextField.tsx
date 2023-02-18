import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { NewApplicationFormData } from "../types";

interface FormFieldProps {
  name: keyof NewApplicationFormData;
  label: string;
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
  placeholder?: string;
  isRequired?: boolean;
  rules?: Record<string, any>;
}

const FormTextField = ({
  name,
  label,
  control,
  errors,
  placeholder,
  isRequired,
  rules,
}: FormFieldProps) => {
  return (
    <FormControl
      isInvalid={!!errors[name]}
      isRequired={isRequired}
      variant="floating"
      mr={4}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <Input aria-label={name} placeholder={placeholder} {...field} />
        )}
      />
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextField;
