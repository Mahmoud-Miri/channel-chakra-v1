import * as React from "react";
import { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
} from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { NumericFormat } from "react-number-format";
import { NewApplicationFormData } from "../types";
import FormTextField from "./FormTextField";

interface AddProductsProps {
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
  onSubmit: () => void;
}

const AddProducts: FC<AddProductsProps> = ({ control, errors, onSubmit }) => {
  return (
    <>
      <HStack spacing={4} mt={2}>
        <FormTextField
          name="productName"
          label="Product Name"
          control={control}
          errors={errors}
          placeholder=" "
          isRequired
          rules={{ required: "Product Name is required" }}
        />

        <FormControl
          isInvalid={!!errors.productQuantity}
          mr={4}
          isRequired
          variant="floating"
        >
          <Controller
            name="productQuantity"
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
                aria-label="product quantity"
              />
            )}
          />
          <FormLabel htmlFor="productQuantity">Product Quantity</FormLabel>
          <FormErrorMessage aria-roledescription="alert">
            {errors.productQuantity?.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.productPrice}
          isRequired
          variant="floating"
        >
          <Controller
            defaultValue={0}
            name="productPrice"
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
                aria-label="product price"
              />
            )}
          />

          <FormLabel htmlFor="productPrice">Product Price</FormLabel>
          <FormErrorMessage>{errors.productPrice?.message}</FormErrorMessage>
        </FormControl>

        <Button
          onClick={() => console.log("")}
          colorScheme="red"
          variant="ghost"
          ml={2}
        >
          <Icon as={FaTrash} />
        </Button>
      </HStack>

      <Divider mt={4} />

      <Flex>
        <Button onClick={onSubmit} mt={4} size="md" colorScheme="blue">
          Add Product
        </Button>
      </Flex>
    </>
  );
};

export default AddProducts;
