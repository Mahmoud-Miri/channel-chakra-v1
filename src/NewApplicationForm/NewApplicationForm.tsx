import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import Card from "../components/Card";
import { NewApplicationFormData } from "./types";
import { newApplicationFormValidationSchema } from "./schemas";
import { AddProducts, ChannelSelect, CustomerInfo } from "./components";

const NewApplicationForm = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewApplicationFormData>({
    resolver: yupResolver(newApplicationFormValidationSchema),
  });

  const onSubmit = (data: NewApplicationFormData) => {
    toast({
      title: "NewApplicationForm submitted",
      description: JSON.stringify(data),
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="4">
          <Card title="Select Channel">
            <ChannelSelect control={control} errors={errors} />
          </Card>
          <Card title="Add Products">
            <AddProducts
              control={control}
              errors={errors}
              onSubmit={() => console.log("button pressed")}
            />
          </Card>
          <Card title="Customer Information">
            <CustomerInfo control={control} errors={errors} />
          </Card>

          <Button
            type="submit"
            mt="4"
            size="md"
            alignSelf="flex-end"
            colorScheme="blue"
          >
            Create Application
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default NewApplicationForm;
