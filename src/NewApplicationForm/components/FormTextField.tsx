import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Control, Controller } from "react-hook-form";
import { NewApplicationFormData } from "../types";

interface FormFieldProps {
  name: string;
  label: string;
  control: Control<NewApplicationFormData>;
  placeholder?: string;
  isRequired?: boolean;
  rules?: Record<string, any>;
  isInvalid: boolean;
  errorMessage: string | undefined;
}

const FormTextField = ({
  name,
  label,
  control,
  placeholder,
  isRequired,
  rules,
  isInvalid,
  errorMessage,
}: FormFieldProps) => {
  return (
    <FormControl
      isInvalid={isInvalid}
      isRequired={isRequired}
      variant="floating"
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue=""
        render={({ field }) => (
          <Input
            aria-label={name}
            placeholder={placeholder}
            value={field.value as string}
            onChange={field.onChange}
            onBlur={field.onBlur}
          />
        )}
      />
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};

export default FormTextField;
