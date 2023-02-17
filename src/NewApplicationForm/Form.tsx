import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Stack,
  Button,
  useToast,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Divider,
} from "@chakra-ui/react";
import * as yup from "yup";
import Card from "../Card";
import ChannelSelect from "./ChannelSelect";
import CustomerInfo from "./CustomerInfo";
import FloatingFormLabel from "../FloatingFormLabel";

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
    <ChakraProvider>
      <Box p={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="4">
            <Card title="Select Channel">
              <ChannelSelect control={control} errors={errors} />
            </Card>
            <Card title="Add Products">
              <Flex>
                <FormControl isInvalid={!!errors.productName} mr={2} isRequired>
                  <FormLabel htmlFor="productName">Product Name</FormLabel>
                  <Controller
                    name="productName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Product Name is required" }}
                    render={({ field }) => (
                      <Input
                        placeholder="Product Name"
                        id="productName"
                        {...field}
                      />
                    )}
                  />
                  {errors.productName && (
                    <Text color="red.500" textAlign="left">
                      {errors.productName.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl
                  isInvalid={!!errors.productQuantity}
                  mr={2}
                  isRequired
                >
                  <FormLabel htmlFor="productQuantity">
                    Product Quantity
                  </FormLabel>
                  <Controller
                    name="productQuantity"
                    control={control}
                    rules={{ required: "Product Quantity is required" }}
                    render={({ field }) => (
                      <Input placeholder="Product Quantity" {...field} />
                    )}
                  />
                  {errors.productQuantity && (
                    <Text color="red.500" textAlign="left">
                      {errors.productQuantity.message}
                    </Text>
                  )}
                </FormControl>

                <FormControl isInvalid={!!errors.productPrice} isRequired>
                  <FormLabel htmlFor="productPrice">Product Price</FormLabel>
                  <Controller
                    name="productPrice"
                    control={control}
                    rules={{ required: "Product Price is required" }}
                    render={({ field }) => (
                      <Input placeholder="Product Price" {...field} />
                    )}
                  />
                  {errors.productPrice && (
                    <Text color="red.500" textAlign="left">
                      {errors.productPrice.message}
                    </Text>
                  )}
                </FormControl>
              </Flex>
              <Divider mt={4} />
              <Flex>
                <Button
                  type="submit"
                  mt="4"
                  size="md"
                  alignSelf="flex-start"
                  colorScheme="blue"
                >
                  Add Product
                </Button>
              </Flex>
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
    </ChakraProvider>
  );
};

export default Form;
