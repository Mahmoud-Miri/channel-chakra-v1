import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useForm } from "react-hook-form";
import Products from "../Products";
import { NewApplicationFormData } from "../../types";

const ProductsWrapper = () => {
  const {
    control,
    formState: { errors },
  } = useForm<NewApplicationFormData>({
    defaultValues: { products: [{ name: "", quantity: 1, price: 0 }] },
  });

  return <Products control={control} errors={errors} />;
};
describe("<Products />", () => {
  it("should render all product fields", () => {
    render(<ProductsWrapper />);

    expect(screen.getByText("Product Name")).toBeVisible();
    expect(screen.getByText("Product Quantity")).toBeVisible();
    expect(screen.getByText("Product Price")).toBeVisible();
    expect(screen.getByText("Add Product")).toBeVisible();
  });

  it("should add a new product when 'Add Product' button is clicked", () => {
    render(<ProductsWrapper />);

    const addProductButton = screen.getByText("Add Product");
    fireEvent.click(addProductButton);

    expect(screen.getAllByText("Product Name")).toHaveLength(2);
    expect(screen.getAllByText("Product Quantity")).toHaveLength(2);
    expect(screen.getAllByText("Product Price")).toHaveLength(2);
  });

  it("should remove a product when 'Delete' button is clicked", () => {
    render(<ProductsWrapper />);

    const addProductButton = screen.getByText("Add Product");
    fireEvent.click(addProductButton);

    const deleteProductButton = screen.getByLabelText("products.0.delete");
    fireEvent.click(deleteProductButton);

    expect(screen.getAllByText("Product Name")).toHaveLength(1);
    expect(screen.getAllByText("Product Quantity")).toHaveLength(1);
    expect(screen.getAllByText("Product Price")).toHaveLength(1);
  });
});
