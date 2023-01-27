import { validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { Grid, Form, Input, Modal, Button, Table } from "semantic-ui-react";
import { useFormik } from "formik";

import CreditApplicationService from "../../services/CreditApplicationService";
import "./CreditApplications.css";

export default function CreditApplicationDetail() {
  let creditApplicationService = new CreditApplicationService();

  const [creditApplication, setcreditApplication] = useState([]);

  const { handleSubmit, handleChange, values, handleBlur } = useFormik({
    initialValues: {
      identityNumber: "",
      birthDate: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      creditApplicationService
        .find(values.identityNumber, values.birthDate)
        .then((result) => setcreditApplication(result.data.data));
      resetForm();
    },
  });

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <br/>
        <h3>Identity Number</h3>
        <input
        placeholder="XXXXXXXXXXX"
          name="identityNumber"
          value={values.identityNumber}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <h3>Birth Date</h3>
        <input
        placeholder="YYYY-MM-DD"
          name="birthDate"
          value={values.birthDate}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br/>
        <Button type="submit" positive>
          Submit
        </Button>
      </Form>

      <Table selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell rowSpan="2">
              Confirmation Information
            </Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Limit</Table.HeaderCell>
            <Table.HeaderCell rowSpan="2">Application Date</Table.HeaderCell>
            <Table.HeaderCell colSpan="7">Customer</Table.HeaderCell>
          </Table.Row>

          <Table.Row>
            <Table.HeaderCell>Identity Number</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>LastName</Table.HeaderCell>
            <Table.HeaderCell>Monthly Income</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>BirthDate</Table.HeaderCell>
            <Table.HeaderCell>Credit Score</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        {creditApplication.map((credit) => (
          <Table.Body>
            <Table.Row>
              <Table.Cell>{credit[0]}</Table.Cell>
              <Table.Cell>{credit[1]}</Table.Cell>
              <Table.Cell>{credit[2]}</Table.Cell>
              <Table.Cell>{credit[3]}</Table.Cell>
              <Table.Cell>{credit[4]}</Table.Cell>
              <Table.Cell>{credit[5]}</Table.Cell>
              <Table.Cell>{credit[6]}</Table.Cell>
              <Table.Cell>{credit[7]}</Table.Cell>
              <Table.Cell>{credit[8]}</Table.Cell>
              <Table.Cell>{credit[9]}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}
