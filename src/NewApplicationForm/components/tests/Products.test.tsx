import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Products from "../Products";
import { NewApplicationFormData } from "../../types";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { newApplicationFormValidationSchema } from "../../schemas";

const ProductsWrapper = () => {
  const {
    control,
    formState: { errors },
  } = useForm<NewApplicationFormData>({
    resolver: yupResolver(newApplicationFormValidationSchema),
    defaultValues: { products: [{ name: "", quantity: 1, price: 0 }] },
    // Don't use onChange mode. per docs it has a heavy impact on performance
    mode: "onBlur",
  });

  return <Products control={control} errors={errors} />;
};
describe("<Products />", () => {
  it("should render the correct number of products based on default values", () => {
    render(<ProductsWrapper />);
    const productNames = screen.getAllByText("Product Name");
    expect(productNames).toHaveLength(1);
  });

  it("should render all product fields", () => {
    render(<ProductsWrapper />);

    expect(screen.getByText("Product Name")).toBeVisible();
    expect(screen.getByText("Quantity")).toBeVisible();
    expect(screen.getByText("Price")).toBeVisible();
    expect(screen.getByText("Add Product")).toBeVisible();
  });

  it("should add a new product when 'Add Product' button is clicked", () => {
    render(<ProductsWrapper />);

    const addProductButton = screen.getByText("Add Product");
    fireEvent.click(addProductButton);

    expect(screen.getAllByText("Product Name")).toHaveLength(2);
    expect(screen.getAllByText("Quantity")).toHaveLength(2);
    expect(screen.getAllByText("Price")).toHaveLength(2);
  });

  it("should remove a product when 'Delete' button is clicked", () => {
    render(<ProductsWrapper />);

    const addProductButton = screen.getByText("Add Product");
    fireEvent.click(addProductButton);

    const deleteProductButton = screen.getByLabelText("products.0.delete");
    fireEvent.click(deleteProductButton);

    expect(screen.getAllByText("Product Name")).toHaveLength(1);
    expect(screen.getAllByText("Quantity")).toHaveLength(1);
    expect(screen.getAllByText("Price")).toHaveLength(1);
  });

  it("should disable the 'Delete' button when there is only one product", () => {
    render(<ProductsWrapper />);
    const deleteProductButton = screen.getByLabelText("products.0.delete");
    expect(deleteProductButton).toBeDisabled();
  });

  it("should enable the 'Delete' button when there are two or more products", () => {
    render(<ProductsWrapper />);
    const addProductButton = screen.getByText("Add Product");
    fireEvent.click(addProductButton);
    const deleteProductButton = screen.getByLabelText("products.0.delete");
    expect(deleteProductButton).toBeEnabled();
  });

  it("should display an error message when no product name is provided", async () => {
    render(<ProductsWrapper />);

    // Set the product name to an empty string
    const productNameInput = screen.getByLabelText("products.0.name");
    fireEvent.change(productNameInput, { target: { value: "" } });
    fireEvent.blur(productNameInput);

    // Ensure that the error message is displayed
    const errorMessage = await screen.findByText("This field requires a value");
    expect(errorMessage).toBeVisible();
  });

  it("should display an error message when no product quantity is provided", async () => {
    render(<ProductsWrapper />);

    // Set the product quantity to an empty string
    const productQuantityInput = screen.getByLabelText("products.0.quantity");
    fireEvent.change(productQuantityInput, { target: { value: "" } });
    fireEvent.blur(productQuantityInput);

    // Ensure that the error message is displayed
    const errorMessage = await screen.findByText(
      "A numerical value is required"
    );
    expect(errorMessage).toBeVisible();
  });

  it("should display an error message product quantity is set to 0", async () => {
    render(<ProductsWrapper />);

    // Set the product quantity to an empty string
    const productQuantityInput = screen.getByLabelText("products.0.quantity");
    fireEvent.change(productQuantityInput, { target: { value: 0 } });
    fireEvent.blur(productQuantityInput);

    // Ensure that the error message is displayed
    const errorMessage = await screen.findByText("Enter a positive value");
    expect(errorMessage).toBeVisible();
  });

  it("should display an error message when no product price is provided", async () => {
    render(<ProductsWrapper />);

    // Set the product price to an empty string
    const productPriceInput = screen.getByLabelText("products.0.price");
    fireEvent.change(productPriceInput, { target: { value: "" } });
    fireEvent.blur(productPriceInput);

    // Ensure that the error message is displayed
    const errorMessage = await screen.findByText(
      "A numerical value is required"
    );
    expect(errorMessage).toBeVisible();
  });
});
