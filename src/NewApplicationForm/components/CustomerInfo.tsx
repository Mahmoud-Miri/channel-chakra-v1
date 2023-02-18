import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { NewApplicationFormData } from "../types";

interface CustomerInfoProps {
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <Stack spacing={4}>
      <Flex>
        <FormControl
          isInvalid={!!errors.name}
          mr={4}
          isRequired
          variant="floating"
        >
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <Input aria-label="name" placeholder=" " {...field} />
            )}
          />
          <FormLabel htmlFor="name">Name</FormLabel>
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.surname} isRequired variant="floating">
          <Controller
            name="surname"
            control={control}
            defaultValue=""
            rules={{ required: "Surname is required" }}
            render={({ field }) => (
              <Input aria-label="surname" placeholder=" " {...field} />
            )}
          />
          <FormLabel htmlFor="surname">Surname</FormLabel>
          <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
      <Flex>
        <FormControl
          isInvalid={!!errors.email}
          mr={4}
          isRequired
          variant="floating"
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input
                aria-label="email"
                placeholder=" "
                type="email"
                {...field}
              />
            )}
          />
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.mobile} isRequired variant="floating">
          <Controller
            name="mobile"
            control={control}
            defaultValue=""
            rules={{ required: "Mobile number is required" }}
            render={({ field }) => (
              <Input
                aria-label="mobile"
                placeholder=" "
                type="tel"
                {...field}
              />
            )}
          />
          <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
          <FormErrorMessage>{errors.mobile?.message}</FormErrorMessage>
        </FormControl>
      </Flex>
    </Stack>
  );
};

export default CustomerInfo;
