import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "./Form";

interface ChannelSelectProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const ChannelSelect = ({ control, errors }: ChannelSelectProps) => {
  return (
    <FormControl
      isInvalid={!!errors.channel}
      isRequired
      variant="floating"
      mt={2}
    >
      <Controller
        name="channel"
        control={control}
        defaultValue=""
        rules={{ required: "Channel is required" }}
        render={({ field }) => (
          <Select
            aria-label="channel"
            placeholder="Select a channel"
            {...field}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
            <option value="whatsapp">WhatsApp</option>
          </Select>
        )}
      />
      <FormLabel>Channel</FormLabel>
      <FormErrorMessage>{errors.channel?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default ChannelSelect;
