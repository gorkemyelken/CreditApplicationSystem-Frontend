import React, { useEffect, useState } from "react";
import {
  Grid,
  Label,
  Form,
  Input,
  Modal,
  Button,
  Table,
} from "semantic-ui-react";
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
          <Table.Body>
            {creditApplication.confirmationInformation == "Approved." ? 
              <Table.Row key={creditApplication.creditApplicationId}>
                <Table.Cell positive>
                  {creditApplication.confirmationInformation}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.limit}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.createDate}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.identityNumber}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.firstName}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.lastName}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.monthlyIncome}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.phoneNumber}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.birthDate}
                </Table.Cell>
                <Table.Cell positive>
                  {creditApplication.customer.creditScore}
                </Table.Cell>
              </Table.Row>
             : 
             <Table.Row key={creditApplication.creditApplicationId}>
             <Table.Cell negative>
               {creditApplication.confirmationInformation}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.limit}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.createDate}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.identityNumber}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.firstName}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.lastName}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.monthlyIncome}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.phoneNumber}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.birthDate}
             </Table.Cell>
             <Table.Cell negative>
               {creditApplication.customer.creditScore}
             </Table.Cell>
           </Table.Row>
            }
          </Table.Body>
        ))}
      </Table>
    </div>
  );
}
