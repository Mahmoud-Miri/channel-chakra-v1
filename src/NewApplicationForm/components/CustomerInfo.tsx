import { HStack, Stack } from "@chakra-ui/react";
import { Control, FieldErrors } from "react-hook-form";
import { NewApplicationFormData } from "../types";
import FormTextField from "./FormTextField";

interface CustomerInfoProps {
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <Stack spacing={4} mt={2}>
      <HStack spacing={4}>
        <FormTextField
          name="name"
          label="Name"
          control={control}
          errors={errors}
          placeholder=" "
          isRequired
          rules={{ required: "Name is required" }}
        />

        <FormTextField
          name="surname"
          label="Surname"
          control={control}
          errors={errors}
          placeholder=" "
          isRequired
          rules={{ required: "Surname is required" }}
        />
      </HStack>

      <HStack spacing={4}>
        <FormTextField
          name="email"
          label="Email"
          control={control}
          errors={errors}
          placeholder=" "
          isRequired
          rules={{ required: "Email is required" }}
        />

        <FormTextField
          name="mobile"
          label="Mobile"
          control={control}
          errors={errors}
          placeholder=" "
          isRequired
          rules={{ required: "Mobile number is required" }}
        />
      </HStack>
    </Stack>
  );
};

export default CustomerInfo;
