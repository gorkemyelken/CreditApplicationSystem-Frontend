import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerService from "../../services/CustomerService";
import { Form, Button, Table, Modal } from "semantic-ui-react";
import "react-toastify/dist/ReactToastify.css";
import CreditApplicationService from "../../services/CreditApplicationService";
import "./CreditApplications.css";

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

export default function ApplyForCredit() {
  let { id } = useParams();

  const [customer, setCustomer] = useState({});
  const [deposit, setDeposit] = useState("");
  const [creditApplication, setCreditApplication] = useState({});

  let customerService = new CustomerService();
  let creditApplicationService = new CreditApplicationService();

  useEffect(() => {
    customerService.getCustomer(id).then((result) => {
      setCustomer(result.data.data);
    });
  }, []);

  const applyForCredit = (customerId, monthlyIncome, creditScore) => {
    creditApplicationService
      .add(customerId, monthlyIncome, creditScore, deposit)
      .then((result) => {
        setCreditApplication(result.data.data);
      });
  };

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
    <div>
      <h1>Apply For Credit</h1>
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
      <Form>
        <br />
        <h3>Deposit(Optional)</h3>
        <input
          placeholder="e.g. 7500"
          name="deposit"
          value={deposit}
          onChange={(event) => setDeposit(event.target.value)}
        />
        <br />
        <Button
          color="green"
          onClick={() => {
            applyForCredit(
              customer.customerId,
              customer.monthlyIncome,
              customer.creditScore
            );
            dispatch({ type: "OPEN_MODAL", dimmer: "blurring" });
          }}
        >
          Submit
        </Button>
        <Modal
          dimmer={dimmer}
          open={open}
          onClose={() => dispatch({ type: "CLOSE_MODAL" })}
        >
          <Modal.Header>Credit Application Result</Modal.Header>
          <Modal.Content>
            {creditApplication.confirmationInformation === "Approved." ? (
              <div className="approved">
                <h1>APPROVED</h1>
                <h3>Limit: {creditApplication.limit}</h3>
              </div>
            ) : (
              <div className="rejected">
                <h1>REJECTED</h1>
              </div>
            )}
          </Modal.Content>
        </Modal>
      </Form>
    </div>
  );
}
