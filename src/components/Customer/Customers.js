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
  Icon
} from "semantic-ui-react";
import { useFormik } from "formik";
import * as yup from "yup";
import "react-toastify/dist/ReactToastify.css";
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
  const validationSchema = yup.object().shape({
    firstName: yup.string().required("Required field."),
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
        window.location.reload(false);
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
    window.location.reload(false);
  };

  return (
    <div>
      <Button
      floated="left"
        color="blue"
        size="huge"
        className="addCustomer"
        onClick={() => dispatch({ type: "OPEN_MODAL", dimmer: "blurring" })}
      ><Icon name='plus' />
        Add New Customer
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
                    fluid
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
                    fluid
                    name="firstName"
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
                    fluid
                    name="lastName"
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
                    fluid
                    name="monthlyIncome"
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
                    fluid
                    name="phoneNumber"
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
                    fluid
                    name="birthDate"
                    value={values.birthDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.birthDate && touched.birthDate && (
                    <Label basic color="red" pointing="above">
                      {errors.birthDate}
                    </Label>
                  )}
                  <Button type="submit" className="addCustomer" positive>
                    Submit
                  </Button>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>
      <Table celled>
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
                <Button>Apply For Credit</Button>
                <Button>Update</Button>
                <Button onClick={() => handleDelete(customer.customerId)}>Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
