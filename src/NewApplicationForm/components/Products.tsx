import { NewApplicationFormData } from "../types";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayAppend,
} from "react-hook-form";
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Stack,
} from "@chakra-ui/react";
import FormTextField from "./FormTextField";
import { NumericFormat } from "react-number-format";
import { FaTrash } from "react-icons/fa";

interface ProductFieldsProps {
  productFields: FieldArrayWithId<NewApplicationFormData, "products", "id">[];
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
  remove: (index: number) => void;
  append: UseFieldArrayAppend<NewApplicationFormData, "products">;
}
const Products = ({
  productFields,
  control,
  errors,
  remove,
  append,
}: ProductFieldsProps) => {
  return (
    <Stack spacing={4}>
      {productFields.map((productField: any, index: number) => (
        <Flex gap={4} key={productField.id}>
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
          onClick={async () => append({ name: "", quantity: 1, price: 0 })}
          size="md"
          colorScheme="blue"
        >
          Add Product
        </Button>
      </Flex>
    </Stack>
  );
};

export default Products;
