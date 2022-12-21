import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log("success");
    });
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="formContainer">
          <label>Name:</label>
          <ErrorMessage name="username" component="span" />
          <Field
            id="inputRegistration"
            name="username"
            placeholder="(Ex.John123...)"
          />
          <label>Pssword:</label>
          <ErrorMessage name="password" component="span" />
          <Field
            type="password"
            id="inputRegistration"
            name="password"
            placeholder="(Your password...)"
          />
          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
