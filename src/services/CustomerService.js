import axios from "axios";

export default class CustomerService {
  getCustomers() {
    return axios.get("http://localhost:8080/customers");
  }

  add(values) {
    return axios.post("http://localhost:8080/customers", values);
  }

  delete(customerId) {
    return axios.delete("http://localhost:8080/customers/" + customerId);
  }

  getCustomerByIdentityNumber(identityNumber) {
    return axios.get(
      "http://localhost:8080/customers/findbyidentitynumber?identityNumber=" +
        identityNumber
    );
  }

  getCustomer(customerId) {
    return axios.get("http://localhost:8080/customers/" + customerId);
  }

  update(id, values) {
    return axios.put("http://localhost:8080/customers/" + id, values);
  }
}
