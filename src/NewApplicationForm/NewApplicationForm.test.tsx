import { screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewApplicationForm } from ".";
import { render } from "../test-utils";

describe("NewApplicationForm", () => {
  test("displays error messages when form is submitted with invalid data", async () => {
    render(<NewApplicationForm />);

    // Submit form with invalid data
    const submitButton = screen.getByText("Create Application");
    userEvent.click(submitButton);

    // Check for error messages
    await waitFor(() => {
      const errors = screen.queryAllByText(/This field requires a value/i);
      expect(errors).toHaveLength(6);
    });
  });

  test("submits form with valid data", async () => {
    render(<NewApplicationForm />);

    // Fill in form fields with valid data
    const nameInput = screen.getByLabelText("name");
    fireEvent.change(nameInput, { target: { value: "John" } });

    const surnameInput = screen.getByLabelText("surname");
    fireEvent.change(surnameInput, { target: { value: "Doe" } });

    const emailInput = screen.getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

    const mobileInput = screen.getByLabelText("mobile");
    fireEvent.change(mobileInput, { target: { value: "1234567890" } });

    const channelSelect = screen.getByLabelText("channel");
    fireEvent.change(channelSelect, { target: { value: "email" } });

    const productNameInput = screen.getByLabelText("products.0.name");
    fireEvent.change(productNameInput, { target: { value: "Product A" } });

    const productQuantityInput = screen.getByLabelText("products.0.quantity");
    fireEvent.change(productQuantityInput, { target: { value: "5" } });

    const productPriceInput = screen.getByLabelText("products.0.price");
    fireEvent.change(productPriceInput, { target: { value: "10.99" } });

    // Submit form
    const submitButton = screen.getByText("Create Application");
    userEvent.click(submitButton);

    // Check for success message
    const successMessage = await screen.findByText(
      "NewApplicationForm submitted"
    );
    expect(successMessage).toBeInTheDocument();

    //Validate that the form data is correct when the form is submitted
    const descriptionElement = successMessage.nextSibling;
    const descriptionText = descriptionElement?.textContent;

    expect(descriptionText).not.toBeNull();

    // @ts-ignore
    const formData = JSON.parse(descriptionText);
    expect(formData).toEqual({
      channel: "email",
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      mobile: "1234567890",
      products: [{ name: "Product A", quantity: 5, price: 10.99 }],
    });
  });
});
