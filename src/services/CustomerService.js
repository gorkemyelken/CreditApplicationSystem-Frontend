import axios from "axios";

export default class CustomerService {
  getCustomers() {
    return axios.get("http://localhost:8080/customers");
  }

  add(values) {
    return axios.post("http://localhost:8080/customers", values);
  }
}
