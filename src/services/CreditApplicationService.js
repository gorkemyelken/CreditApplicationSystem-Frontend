import axios from "axios";

export default class CreditApplicationService {
  getCreditApplications() {
    return axios.get("http://localhost:8080/creditapplications");
  }
}