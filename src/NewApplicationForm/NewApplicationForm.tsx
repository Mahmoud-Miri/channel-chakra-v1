import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import Card from "../components/Card";
import { NewApplicationFormData } from "./types";
import { newApplicationFormValidationSchema } from "./schemas";
import { ChannelSelect, CustomerInfo } from "./components";
import * as React from "react";
import { NumericFormat } from "react-number-format";
import { FaTrash } from "react-icons/fa";
import FormTextField from "./components/FormTextField";

const NewApplicationForm = () => {
  const toast = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewApplicationFormData>({
    resolver: yupResolver(newApplicationFormValidationSchema),
    defaultValues: { products: [{ name: "", quantity: 1, price: 0 }] },
  });

  const {
    fields: productFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "products",
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
            <Stack spacing={4}>
              {productFields.map((productField, index) => (
                <Flex gap={4} key={productField.id} mb={4}>
                  <FormTextField
                    name={`products.${index}.name`}
                    label="Product Name"
                    control={control}
                    placeholder=" "
                    isRequired
                    rules={{ required: "Product Name is required" }}
                    isInvalid={!!errors?.products?.[index]?.name?.message}
                    errorMessage={errors?.products?.[index]?.name?.message}
                  />

                  <FormControl
                    isInvalid={!!errors?.products?.[index]?.quantity?.message}
                    isRequired
                    variant="floating"
                  >
                    <Controller
                      name={`products.${index}.quantity`}
                      control={control}
                      rules={{ required: "Product Quantity is required" }}
                      defaultValue={1}
                      render={({ field }) => (
                        <NumericFormat
                          customInput={Input}
                          placeholder=" "
                          defaultValue={1}
                          allowNegative={false}
                          thousandSeparator={true}
                          onValueChange={(v) => field.onChange(v.value)}
                          aria-label={`products.${index}.quantity`}
                        />
                      )}
                    />
                    <FormLabel htmlFor={`products.${index}.quantity`}>
                      Product Quantity
                    </FormLabel>
                    <FormErrorMessage aria-roledescription="alert">
                      {errors?.products?.[index]?.quantity?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={!!errors?.products?.[index]?.price?.message}
                    isRequired
                    variant="floating"
                  >
                    <Controller
                      defaultValue={0}
                      name={`products.${index}.price`}
                      control={control}
                      rules={{ required: "Product Price is required" }}
                      render={({ field }) => (
                        <NumericFormat
                          customInput={Input}
                          placeholder=" "
                          allowNegative={false}
                          defaultValue={0}
                          thousandSeparator={true}
                          onValueChange={(v) => field.onChange(v.value)}
                          aria-label={`products.${index}.price`}
                        />
                      )}
                    />

                    <FormLabel htmlFor={`products.${index}.price`}>
                      Product Price
                    </FormLabel>
                    <FormErrorMessage>
                      {errors?.products?.[index]?.price?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <Button
                    onClick={() => remove(index)}
                    colorScheme="red"
                    variant="ghost"
                    disabled={productFields.length < 2}
                  >
                    <Icon as={FaTrash} />
                  </Button>
                </Flex>
              ))}

              <Divider />

              <Flex>
                <Button
                  onClick={async () =>
                    append({ name: "", quantity: 1, price: 0 })
                  }
                  size="md"
                  colorScheme="blue"
                >
                  Add Product
                </Button>
              </Flex>
            </Stack>
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
