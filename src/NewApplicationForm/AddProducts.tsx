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
  Icon,
  Input,
} from "@chakra-ui/react";
import { FormData } from "./Form";
import { FaTrash } from "react-icons/all";
import { NumericFormat } from "react-number-format";

interface AddProductsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: () => void;
}

const AddProducts: FC<AddProductsProps> = ({ control, errors, onSubmit }) => {
  return (
    <>
      <Flex>
        <FormControl
          mr={4}
          isRequired
          variant="floating"
          isInvalid={!!errors.productName}
        >
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            rules={{ required: "Product Name is required" }}
            render={({ field }) => (
              <Input placeholder=" " id="productName" {...field} />
            )}
          />
          <FormLabel htmlFor="productName">Product Name</FormLabel>
          <FormErrorMessage>{errors.productName?.message}</FormErrorMessage>
        </FormControl>

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
            defaultValue={0}
            render={({ field }) => (
              <NumericFormat
                customInput={Input}
                placeholder=" "
                defaultValue={0}
                allowNegative={false}
                thousandSeparator={true}
                onValueChange={(v) => field.onChange(v.value)}
              />
            )}
          />
          <FormLabel htmlFor="productQuantity">Product Quantity</FormLabel>
          <FormErrorMessage>{errors.productQuantity?.message}</FormErrorMessage>
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
      </Flex>

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
