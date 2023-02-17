import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box, Button, Stack, useToast } from "@chakra-ui/react";
import * as yup from "yup";
import Card from "../components/Card";
import ChannelSelect from "./ChannelSelect";
import CustomerInfo from "./CustomerInfo";
import AddProducts from "./AddProducts";

export interface FormData {
  channel: string;
  name: string;
  surname: string;
  email: string;
  mobile: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
}

export const schema = yup.object().shape({
  name: yup.string().required(),
  surname: yup.string().required(),
  channel: yup.string().required(),
  email: yup.string().email().required(),
  mobile: yup.string().matches(/^\d+$/, "Must be only digits").required(),
  productName: yup.string().required(),
  productQuantity: yup.number().required(),
  productPrice: yup.number().required(),
});

const Form = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit = (data: FormData) => {
    toast({
      title: "Form submitted",
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

export default Form;
