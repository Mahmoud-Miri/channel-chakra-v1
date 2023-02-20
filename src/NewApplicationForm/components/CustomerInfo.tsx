import { Flex, Stack } from "@chakra-ui/react";
import { Control, FieldErrors } from "react-hook-form";
import { NewApplicationFormData } from "../types";
import FormTextField from "./FormTextField";

interface CustomerInfoProps {
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <Stack spacing={4} my={2}>
      <Flex gap={4} mb={2}>
        <FormTextField
          name="name"
          label="Name"
          control={control}
          placeholder=" "
          isRequired
          isInvalid={!!errors?.name?.message}
          errorMessage={errors?.name?.message}
        />

        <FormTextField
          name="surname"
          label="Surname"
          control={control}
          placeholder=" "
          isRequired
          isInvalid={!!errors?.surname?.message}
          errorMessage={errors?.surname?.message}
        />
      </Flex>

      <Flex gap={4}>
        <FormTextField
          name="email"
          label="Email"
          control={control}
          placeholder=" "
          isRequired
          isInvalid={!!errors?.email?.message}
          errorMessage={errors?.email?.message}
        />

        <FormTextField
          name="mobile"
          label="Mobile"
          control={control}
          placeholder=" "
          isRequired
          isInvalid={!!errors?.mobile?.message}
          errorMessage={errors?.mobile?.message}
        />
      </Flex>
    </Stack>
  );
};

export default CustomerInfo;
