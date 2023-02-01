import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";

export default function CustomerUpdate() {

  const notifyCustomerUpdated = () =>
    toast.success("Customer successfully updated!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  let { id } = useParams();

  const [customer, setCustomer] = useState({});


  let customerService = new CustomerService();

  useEffect(() => {
    customerService
      .getCustomer(id)
      .then((result) => {
        setCustomer(result.data.data);
        formik.setValues({
          identityNumber: result.data.data.identityNumber,
          firstName: result.data.data.firstName,
          lastName: result.data.data.lastName,
          monthlyIncome: result.data.data.monthlyIncome,
          phoneNumber: result.data.data.phoneNumber,
          birthDate: result.data.data.birthDate,
        });
      });
  }, []);

  const initialValues = {
    identityNumber: customer.identityNumber,
    firstName: "",
    lastName: "",
    monthlyIncome: "",
    phoneNumber: "",
    birthDate: "",
  };

  const onSubmit = (values) => {
    console.log(values);
    customerService.update(customer.customerId, values);
    notifyCustomerUpdated();
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: onSubmit,
  });

  const handleChange = (fieldName, value) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <h1>Update Customer</h1>
      <Form onSubmit={formik.handleSubmit}>
        <h3>Identity Number</h3>
        <Input
          placeholder={customer.identityNumber}
          name="identityNumber"
          
          onChange={(event, data) => handleChange("identityNumber", data.value)}
          value={formik.values.identityNumber}
        />
        <h3>First Name</h3>
        <Input
          placeholder={customer.firstName}
          name="firstName"
          
          onChange={(event, data) => handleChange("firstName", data.value)}
          value={formik.values.firstName}
        />
        <h3>Last Name</h3>
        <Input
          placeholder={customer.lastName}
          name="lastName"
          
          onChange={(event, data) => handleChange("lastName", data.value)}
          value={formik.values.lastName}
        />
        <h3>Monthly Income</h3>
        <Input
          placeholder={customer.monthlyIncome}
          name="monthlyIncome"
          
          onChange={(event, data) => handleChange("monthlyIncome", data.value)}
          value={formik.values.monthlyIncome}
        />
        <h3>Phone Number</h3>
        <Input
          placeholder={customer.phoneNumber}
          name="phoneNumber"
          
          onChange={(event, data) => handleChange("phoneNumber", data.value)}
          value={formik.values.phoneNumber}
        />
        <h3>Date Of Birth</h3>
        <Input
          placeholder={customer.birthDate}
          name="birthDate"
          
          onChange={(event, data) => handleChange("birthDate", data.value)}
          value={formik.values.birthDate}
        />
        <br />
        <Button type="submit" positive>
          Submit
        </Button>
      </Form>
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


