import { FC } from "react";
import { Controller, Control, FieldErrors } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Button,
  Divider,
  InputGroup,
  InputRightAddon,
  Icon,
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
        <FormControl mr={4} isRequired>
          <FormLabel htmlFor="productName">Product Name</FormLabel>
          <Controller
            name="productName"
            control={control}
            defaultValue=""
            rules={{ required: "Product Name is required" }}
            render={({ field }) => (
              <Input placeholder="Product Name" id="productName" {...field} />
            )}
          />
          {errors.productName && (
            <Text color="red.500" textAlign="left">
              {errors.productName.message}
            </Text>
          )}
        </FormControl>

        <FormControl isInvalid={!!errors.productQuantity} mr={4} isRequired>
          <FormLabel htmlFor="productQuantity">Product Quantity</FormLabel>
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
              <InputGroup size={"md"}>
                {/*<Input placeholder="Product Price" {...field} />*/}
                {/*<InputRightAddon children=".com" />*/}
                <Input placeholder="Product Price" {...field} />
                <Button
                  onClick={() => field.onChange("")}
                  colorScheme="red"
                  variant="ghost"
                  ml={2}
                >
                  <Icon as={FaTrash} />
                </Button>
                {/*<Button*/}
                {/*  onClick={() => field.onChange("")}*/}
                {/*  colorScheme="red"*/}
                {/*  variant="ghost"*/}
                {/*  ml={2}*/}
                {/*>*/}
                {/*  <Icon as={FaTrash} />*/}
                {/*</Button>*/}
              </InputGroup>
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
        <Button onClick={onSubmit} mt={4} size="md" colorScheme="blue">
          Add Product
        </Button>
      </Flex>
    </>
  );
};

export default AddProducts;
