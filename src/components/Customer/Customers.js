import React, { useEffect, useState } from "react";
import CustomerService from "../../services/CustomerService";
import {
  Grid,
  Label,
  Form,
  Input,
  Modal,
  Button,
  Table,
  Icon,
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import "./Customers.css";

function exampleReducer(state, action) {
  switch (action.type) {
    case "OPEN_MODAL":
      return { open: true, dimmer: action.dimmer };
    case "CLOSE_MODAL":
      return { open: false };
    default:
      throw new Error();
  }
}

export default function Customers() {
  const notifyCustomerAdded = () =>
    toast.success("Customer successfully added!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyCustomerDeleted = () =>
    toast.success("Customer successfully deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const validationSchema = yup.object().shape({
    identityNumber: yup
      .string()
      .required("Required field.")
      .length(11, "Identity number must be 11 character."),
    firstName: yup.string().required("Required field."),
    lastName: yup.string().required("Required field."),
    monthlyIncome: yup
      .number("Monthly income must be number.")
      .required("Required field."),
    phoneNumber: yup.string().required("Required field."),
    birthDate: yup.string().required("Required field."),
  });

  const { handleSubmit, handleChange, values, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        identityNumber: "",
        firstName: "",
        lastName: "",
        monthlyIncome: "",
        phoneNumber: "",
        birthDate: "",
      },
      onSubmit: (values, { resetForm }) => {
        console.log(values);
        customerService.add(values);
        resetForm();
        dispatch({ type: "CLOSE_MODAL" });
        notifyCustomerAdded();
      },
      validationSchema,
    });

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  let customerService = new CustomerService();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    customerService
      .getCustomers()
      .then((result) => setCustomers(result.data.data));
  }, []);

  const handleDelete = (customerId) => {
    customerService.delete(customerId);
    notifyCustomerDeleted();
  };

  return (
    <div>
      <Button
        floated="left"
        color="blue"
        className="button"
        onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
      >
        <Icon name="plus" />
        Add New Customer
      </Button>
      <Button
        floated="left"
        className="button"
        color="blue"
        as={NavLink}
        to="/customers/search"
      >
        <Icon name="search" />
        Search Customer
      </Button>
      <Modal
        dimmer={dimmer}
        open={open}
        onClose={() => dispatch({ type: "CLOSE_MODAL" })}
      >
        <Modal.Header>Add New Customer</Modal.Header>
        <Modal.Content>
          <Grid centered>
            <Grid.Row>
              <Grid.Column width={8} textAlign="center">
                <Form onSubmit={handleSubmit}>
                  <h3>Identity Number</h3>
                  <Input
                    placeholder="XXXXXXXXXXX"
                    name="identityNumber"
                    value={values.identityNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.identityNumber && touched.identityNumber && (
                    <Label basic color="red" pointing="above">
                      {errors.identityNumber}
                    </Label>
                  )}
                  <h3>First Name</h3>
                  <Input
                    name="firstName"
                    placeholder="Example"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.firstName && touched.firstName && (
                    <Label basic color="red" pointing="above">
                      {errors.firstName}
                    </Label>
                  )}
                  <h3>Last Name</h3>
                  <Input
                    name="lastName"
                    placeholder="Example"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.lastName && touched.lastName && (
                    <Label basic color="red" pointing="above">
                      {errors.lastName}
                    </Label>
                  )}
                  <h3>Monthly Income</h3>
                  <Input
                    name="monthlyIncome"
                    placeholder="e.g. 7500"
                    value={values.monthlyIncome}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.monthlyIncome && touched.monthlyIncome && (
                    <Label basic color="red" pointing="above">
                      {errors.monthlyIncome}
                    </Label>
                  )}
                  <h3>Phone Number</h3>
                  <Input
                    name="phoneNumber"
                    placeholder="5XXXXXXXXX"
                    value={values.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Label basic color="red" pointing="above">
                      {errors.phoneNumber}
                    </Label>
                  )}
                  <h3>Date Of Birth</h3>
                  <Input
                    name="birthDate"
                    placeholder="YYYY-MM-DD"
                    value={values.birthDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.birthDate && touched.birthDate && (
                    <Label basic color="red" pointing="above">
                      {errors.birthDate}
                    </Label>
                  )}
                  <br />
                  <Button type="submit" className="addCustomer" positive>
                    Submit
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Identity Number</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>LastName</Table.HeaderCell>
            <Table.HeaderCell>Monthly Income</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>BirthDate</Table.HeaderCell>
            <Table.HeaderCell>Credit Score</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer) => (
            <Table.Row key={customer.customerId}>
              <Table.Cell>{customer.identityNumber}</Table.Cell>
              <Table.Cell>{customer.firstName}</Table.Cell>
              <Table.Cell>{customer.lastName}</Table.Cell>
              <Table.Cell>{customer.monthlyIncome}</Table.Cell>
              <Table.Cell>{customer.phoneNumber}</Table.Cell>
              <Table.Cell>{customer.birthDate}</Table.Cell>
              <Table.Cell>{customer.creditScore}</Table.Cell>
              <Table.Cell>
                <Button
                  color="green"
                  as={NavLink}
                  to={`/customers/applyforcredit/${customer.customerId}`}
                >
                  <Icon loading name="spinner" />
                  Apply For Credit
                </Button>
                <Button
                  color="facebook"
                  as={NavLink}
                  to={`/customers/update/${customer.customerId}`}
                >
                  <Icon name="refresh" />
                  Update
                </Button>
                <Button
                  color="red"
                  onClick={() => handleDelete(customer.customerId)}
                >
                  <Icon name="trash" />
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
