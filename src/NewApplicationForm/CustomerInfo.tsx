import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "./Form";

interface CustomerInfoProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <Stack spacing={4}>
      <Flex>
        <FormControl isInvalid={!!errors.name} mr={4} isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: "Name is required" }}
            render={({ field }) => <Input placeholder="Name" {...field} />}
          />
          {errors.name && (
            <Text color="red.500" textAlign="left">
              {errors.name.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.surname} isRequired>
          <FormLabel htmlFor="surname">Surname</FormLabel>
          <Controller
            name="surname"
            control={control}
            defaultValue=""
            rules={{ required: "Surname is required" }}
            render={({ field }) => <Input placeholder="Surname" {...field} />}
          />
          {errors.surname && (
            <Text color="red.500" textAlign="left">
              {errors.surname.message}
            </Text>
          )}
        </FormControl>
      </Flex>
      <Flex>
        <FormControl isInvalid={!!errors.email} mr={4} isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: "Email is required" }}
            render={({ field }) => (
              <Input placeholder="Email" type="email" {...field} />
            )}
          />
          {errors.email && (
            <Text textAlign="left" color="red.500">
              {errors.email.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.mobile} isRequired>
          <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
          <Controller
            name="mobile"
            control={control}
            defaultValue=""
            rules={{ required: "Mobile number is required" }}
            render={({ field }) => (
              <Input placeholder="Mobile number" type="tel" {...field} />
            )}
          />
          {errors.mobile && (
            <Text textAlign="left" color="red.500">
              {errors.mobile.message}
            </Text>
          )}
        </FormControl>
      </Flex>
    </Stack>
  );
};

export default CustomerInfo;
