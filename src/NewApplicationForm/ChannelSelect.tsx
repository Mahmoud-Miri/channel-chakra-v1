import { Box, FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { FormData } from "./Form";

interface ChannelSelectProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const ChannelSelect = ({ control, errors }: ChannelSelectProps) => {
  return (
    <FormControl isInvalid={!!errors.channel} isRequired>
      <FormLabel htmlFor="channel">Channels</FormLabel>
      <Controller
        name="channel"
        control={control}
        defaultValue=""
        rules={{ required: "Channel is required" }}
        render={({ field }) => (
          <Select
            aria-label="Channels"
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
      {errors.channel && (
        <Box alignSelf="">
          <Text textAlign="left" color="red.500">
            {errors.channel.message}
          </Text>
        </Box>
      )}
    </FormControl>
  );
};

export default ChannelSelect;
