import React from "react";
import { Container, Header } from "semantic-ui-react";
import RegisterForm from "./RegisterForm";

function Register(props) {
  return (
    <Container>
      <Header>Welcome to our app</Header>
      <RegisterForm />
    </Container>
  );
}

export default Register;
