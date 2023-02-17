import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

describe.skip("Form", () => {
  it("submits the form successfully when all fields are valid", async () => {
    const { getByLabelText, getByText, queryByText } = await render(<Form />);

    // Fill out the form
    userEvent.selectOptions(getByLabelText("Channels"), "email");
    fireEvent.input(getByLabelText("Name"), { target: { value: "John" } });
    fireEvent.input(getByLabelText("Surname"), { target: { value: "Doe" } });
    fireEvent.input(getByLabelText("Email"), {
      target: { value: "johndoe@example.com" },
    });
    fireEvent.input(getByLabelText("Mobile Number"), {
      target: { value: "1234567890" },
    });

    // Submit the form
    userEvent.click(getByText("Create Application"));

    // Verify that the success toast message is shown
    await waitFor(() =>
      expect(
        queryByText("Form submitted", { exact: false })
      ).toBeInTheDocument()
    );
  });

  it("shows an error message when the form is submitted with invalid fields", async () => {
    const { getByLabelText, getByText, queryByText } = render(<Form />);

    // Fill out the form with invalid fields
    userEvent.selectOptions(getByLabelText("Channels"), "");
    fireEvent.input(getByLabelText("Name"), { target: { value: "" } });
    fireEvent.input(getByLabelText("Surname"), { target: { value: "" } });
    fireEvent.input(getByLabelText("Email"), {
      target: { value: "invalid-email" },
    });
    fireEvent.input(getByLabelText("Mobile Number"), {
      target: { value: "not-a-number" },
    });

    // Submit the form
    userEvent.click(getByText("Create Application"));

    // Verify that the error messages are shown for each invalid field
    expect(getByText("Channel is required")).toBeInTheDocument();
    expect(getByText("Name is required")).toBeInTheDocument();
    expect(getByText("Surname is required")).toBeInTheDocument();
    expect(getByText("Email is not a valid email")).toBeInTheDocument();
    expect(getByText("Must be only digits")).toBeInTheDocument();

    // Verify that the success toast message is not shown
    await waitFor(() =>
      expect(
        queryByText("Form submitted", { exact: false })
      ).not.toBeInTheDocument()
    );
  });
});
