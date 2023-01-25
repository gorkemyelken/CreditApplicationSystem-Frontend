import React from "react";
import { NavLink } from "react-router-dom";
import { Image, Button, Label } from "semantic-ui-react";
import definex from "../../images/definex.png";
import "./Home.css";

export default function Home() {
  return (
    <div>
      <Image className="homeImage" src={definex} />
      <h1 className="homeTitle">DefineX Java Spring Practicum Final Case</h1>
      <h1 className="systemTitle">Credit Application System</h1>
    </div>
  );
}
