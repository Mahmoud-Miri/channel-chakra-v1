import { NewApplicationFormData } from "../types";
import {
  Control,
  Controller,
  FieldArrayWithId,
  FieldErrors,
  useFieldArray,
  useWatch,
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
  Text,
} from "@chakra-ui/react";
import FormTextField from "./FormTextField";
import { NumericFormat } from "react-number-format";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";

const formatTotalPriceWithThousandSeparator = (totalPrice: Number) =>
  totalPrice
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

interface ProductsProps {
  control: Control<NewApplicationFormData>;
  errors: FieldErrors<NewApplicationFormData>;
}
const Products = ({ control, errors }: ProductsProps) => {
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    fields: products,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "products",
  });

  const productsWatch = useWatch({ control: control, name: "products" });

  useEffect(() => {
    setTotalPrice(
      productsWatch.reduce((sum, product) => sum + Number(product.price), 0)
    );
  }, [productsWatch]);

  return (
    <Stack spacing={4}>
      {products.map(
        (
          product: FieldArrayWithId<NewApplicationFormData, "products", "id">,
          index: number
        ) => (
          <Flex gap={4} key={product.id}>
            <FormTextField
              name={`products.${index}.name`}
              label="Product Name"
              control={control}
              placeholder=" "
              isRequired
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
                defaultValue={1}
                render={({ field }) => (
                  <NumericFormat
                    customInput={Input}
                    placeholder=" "
                    defaultValue={1}
                    allowNegative={false}
                    thousandSeparator={true}
                    onValueChange={(v) => field.onChange(v.value)}
                    onBlur={field.onBlur}
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
                render={({ field }) => (
                  <NumericFormat
                    customInput={Input}
                    placeholder=" "
                    allowNegative={false}
                    decimalScale={2}
                    defaultValue={0}
                    thousandSeparator={true}
                    onValueChange={(v) => field.onChange(v.value)}
                    onBlur={field.onBlur}
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
              disabled={products.length < 2}
              aria-label={`products.${index}.delete`}
            >
              <Icon as={FaTrash} />
            </Button>
          </Flex>
        )
      )}

      <Divider />

      <Flex justifyContent="space-between" alignItems="center">
        <Button
          onClick={async () => append({ name: "", quantity: 1, price: 0 })}
          size="md"
          colorScheme="blue"
        >
          Add Product
        </Button>

        <Text
          fontSize={"md"}
          fontWeight={"bold"}
        >{`Total Price: ${formatTotalPriceWithThousandSeparator(
          totalPrice
        )}`}</Text>
      </Flex>
    </Stack>
  );
};

export default Products;
