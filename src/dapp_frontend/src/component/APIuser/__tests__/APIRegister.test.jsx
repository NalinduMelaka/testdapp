import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import APIRegister from "../APIRegister";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../../dapp_backend", () => ({
  addMember: jest.fn(),
  createPatientIdMapping: jest.fn(),
}));

describe("APIRegister", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the component", () => {
    render(
      <Router>
        <APIRegister />
      </Router>
    );
    expect(
      screen.getByText("Account creation for Heath pass API user")
    ).toBeInTheDocument();
  });

  test("handles user input changes", () => {
    render(
      <Router>
        <APIRegister />
      </Router>
    );
    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const idInput = screen.getByLabelText("ID No");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(idInput, { target: { value: "123456789" } });

    expect(firstNameInput).toHaveValue("John");
    expect(lastNameInput).toHaveValue("Doe");
    expect(phoneInput).toHaveValue("1234567890");
    expect(idInput).toHaveValue("123456789");
  });

  test("displays error toast when submitting with incomplete data", async () => {
    render(
      <Router>
        <APIRegister />
      </Router>
    );
    const submitButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Please fill Patient Data before register!",
        expect.objectContaining({
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: expect.any(Function),
        })
      );
    });
  });

  test("submits form with complete data and handles success", async () => {
    const addMemberMock = jest.fn().mockResolvedValue({ ok: true });
    const createPatientIdMappingMock = jest
      .fn()
      .mockResolvedValue({ ok: true });
    jest.mock("../../../dapp_backend", () => ({
      addMember: addMemberMock,
      createPatientIdMapping: createPatientIdMappingMock,
    }));

    render(
      <Router>
        <APIRegister />
      </Router>
    );

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const idInput = screen.getByLabelText("ID No");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(idInput, { target: { value: "123456789" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addMemberMock).toHaveBeenCalledWith({
        apiuser: {
          firstname: "John",
          lastname: "Doe",
          phone: "1234567890",
          id: "123456789",
        },
      });
      expect(createPatientIdMappingMock).toHaveBeenCalledWith("123456789");
      expect(toast.success).toHaveBeenCalledWith(
        "🦄 Patient added successfully!",
        expect.objectContaining({
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: expect.any(Function),
        })
      );
    });
  });

  test("submits form with complete data and handles error", async () => {
    const addMemberMock = jest
      .fn()
      .mockResolvedValue({ error: "Something went wrong" });
    const createPatientIdMappingMock = jest
      .fn()
      .mockResolvedValue({ error: "Something went wrong" });
    jest.mock("../../../dapp_backend", () => ({
      addMember: addMemberMock,
      createPatientIdMapping: createPatientIdMappingMock,
    }));

    render(
      <Router>
        <APIRegister />
      </Router>
    );

    const firstNameInput = screen.getByLabelText("First Name");
    const lastNameInput = screen.getByLabelText("Last Name");
    const phoneInput = screen.getByLabelText("Phone Number");
    const idInput = screen.getByLabelText("ID No");

    fireEvent.change(firstNameInput, { target: { value: "John" } });
    fireEvent.change(lastNameInput, { target: { value: "Doe" } });
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    fireEvent.change(idInput, { target: { value: "123456789" } });

    const submitButton = screen.getByRole("button", { name: "Register" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Something wrong try again later!",
        expect.objectContaining({
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: expect.any(Function),
        })
      );
    });
  });
});
