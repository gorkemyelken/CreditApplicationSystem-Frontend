import React, { useEffect, useState } from "react";
import {
  Icon,
  Label,
  Form,
  Input,
  Modal,
  Button,
  Table,
} from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import CreditApplicationService from "../../services/CreditApplicationService";
import "./CreditApplications.css";

export default function CreditApplications() {
  let creditApplicationService = new CreditApplicationService();

  const [creditApplications, setcreditApplications] = useState([]);

  useEffect(() => {
    creditApplicationService
      .getCreditApplications()
      .then((result) => setcreditApplications(result.data.data));
  }, []);

  return (
    <div>
      <Button
      floated="left"
        className="button"
        color="blue"
        as={NavLink}
        to="/creditapplications/search"
      >
        <Icon name="search" />
        Search Credit Application
      </Button>
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

        {creditApplications.map((creditApplication) => (
          <Table.Body key={creditApplication.creditApplicationId}>
            {creditApplication.confirmationInformation == "Approved." ? (
              <Table.Row>
                <Table.Cell positive>
                  {creditApplication.confirmationInformation}
                </Table.Cell>
                <Table.Cell positive>{creditApplication.limit}</Table.Cell>
                <Table.Cell positive>{creditApplication.createDate}</Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer?.identityNumber}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer?.firstName}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer?.lastName}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customerMonthlyIncome}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer?.phoneNumber}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer?.birthDate}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customerCreditScore}
                </Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row>
                <Table.Cell negative>
                  {creditApplication.confirmationInformation}
                </Table.Cell>
                <Table.Cell negative>{creditApplication.limit}</Table.Cell>
                <Table.Cell negative>{creditApplication.createDate}</Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customer?.identityNumber}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customer?.firstName}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customer?.lastName}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customerMonthlyIncome}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customer?.phoneNumber}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customer?.birthDate}
                </Table.Cell>
                <Table.Cell negative>
                  {creditApplication.customerCreditScore}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}
