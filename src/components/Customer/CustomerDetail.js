import { validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { Grid, Form, Icon, Modal, Button, Table } from "semantic-ui-react";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerService from "../../services/CustomerService";
import CreditApplicationService from "../../services/CreditApplicationService";

export default function CustomerDetail() {
  let customerService = new CustomerService();

  const [customer, setCustomer] = useState({});

  const { handleSubmit, handleChange, values, handleBlur } = useFormik({
    initialValues: {
      identityNumber: "",
    },
    onSubmit: (values, { resetForm }) => {
      customerService
        .getCustomerByIdentityNumber(values.identityNumber)
        .then((result) => setCustomer(result.data.data));
      resetForm();
    },
  });

  return (
    <div>
      <h1>Search Customer</h1>
      <Form onSubmit={handleSubmit}>
        <br />
        <h3>Identity Number</h3>
        <input
          placeholder="XXXXXXXXXXX"
          name="identityNumber"
          value={values.identityNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />
        <Button type="submit" positive>
          Submit
        </Button>
      </Form>
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
          <Table.Row key={customer.customerId}>
            <Table.Cell>{customer.identityNumber}</Table.Cell>
            <Table.Cell>{customer.firstName}</Table.Cell>
            <Table.Cell>{customer.lastName}</Table.Cell>
            <Table.Cell>{customer.monthlyIncome}</Table.Cell>
            <Table.Cell>{customer.phoneNumber}</Table.Cell>
            <Table.Cell>{customer.birthDate}</Table.Cell>
            <Table.Cell>{customer.creditScore}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
