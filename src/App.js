import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import 'semantic-ui-css/semantic.min.css'
import Customers from "./components/Customer/Customers";
import CreditApplications from "./components/Credit Application/CreditApplications";
import CreditApplicationDetail from "./components/Credit Application/CreditApplicationDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/customers" element={<Customers />}></Route>
          <Route exact path="/creditapplications" element={<CreditApplications />}></Route>
          <Route exact path="/creditapplications/search" element={<CreditApplicationDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
