import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Container, Input, Form, Button, Message } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("EMAIL FIELD").required("FILL THIS SHIT!"),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  age: yup.number().positive().integer().min(15).max(99).required(),
});

function RegisterForm() {
  const { handleSubmit, errors, control, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(data, "TODO SEND FORM TO SERVER");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <label htmlFor="">Email</label>
          <Controller
            name="email"
            control={control}
            as={Input}
            placeholder="Ivan"
            defaultValue=""
          />
          {errors.email && (
            <Message color="red">{errors.email.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">First Name</label>
          <Controller
            name="firstName"
            control={control}
            as={Input}
            placeholder="Ivan"
            defaultValue=""
          />
          {errors.firstName && (
            <Message color="red">{errors.firstName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Last Name</label>
          <Controller
            name="lastName"
            control={control}
            as={Input}
            placeholder="Ivanov"
            defaultValue=""
          />
          {errors.lastName && (
            <Message color="red">{errors.lastName.message}</Message>
          )}
        </Form.Field>
        <Form.Field>
          <label htmlFor="">Age</label>
          <Controller
            name="age"
            control={control}
            placeholder="15"
            defaultValue=""
            type="number"
            as={Input}
          />
          {errors.age && <Message color="red">{errors.age.message}</Message>}
        </Form.Field>
        <Button type="submit" primary>
          Sign Up
        </Button>
        <Button type="button" color="yellow" onClick={() => reset({})}>
          Reset
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterForm;
