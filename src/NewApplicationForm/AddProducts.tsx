import * as React from "react";
import { FC } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import { FormData } from "./Form";
import { FaTrash } from "react-icons/all";

interface AddProductsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onSubmit: () => void;
}

const AddProducts: FC<AddProductsProps> = ({ control, errors, onSubmit }) => {
  return (
    <>
      <Flex>
        <FormControl mr={4} isRequired variant="floating">
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
          {errors.productName && (
            <Text color="red.500" textAlign="left">
              {errors.productName.message}
            </Text>
          )}
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
            render={({ field }) => <Input placeholder=" " {...field} />}
          />
          <FormLabel htmlFor="productQuantity">Product Quantity</FormLabel>

          {errors.productQuantity && (
            <Text color="red.500" textAlign="left">
              {errors.productQuantity.message}
            </Text>
          )}
        </FormControl>

        <FormControl
          isInvalid={!!errors.productPrice}
          isRequired
          variant="floating"
        >
          <Controller
            name="productPrice"
            control={control}
            rules={{ required: "Product Price is required" }}
            render={({ field }) => <Input placeholder=" " {...field} />}
          />
          <FormLabel htmlFor="productPrice">Product Price</FormLabel>
          {errors.productPrice && (
            <Text color="red.500" textAlign="left">
              {errors.productPrice.message}
            </Text>
          )}
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
