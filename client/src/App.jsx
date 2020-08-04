import React, { useState } from "react";
import "./App.css";
import DynamicForm from "./react-hook-form/DynamicForm";
import FormWithHtmlValidation from "./react-hook-form/FormWithHtmlValidation";
import FormWithReactValidation from "./react-hook-form/FormWithReactValidation";
import FormikFormWithReactValidation from './formik/FormWithReactValidation';
import UncontrolledForm from "./uncontrolled/UncontrolledForm";

function App() {
  const [formType, setFormtype] = useState();

  return (
    <>
      <p>Pick a type of form to view</p>

      <button onClick={(_) => setFormtype("htmlValidation")}>
        Form with HTML validation
        <br />
        <em>using React Hook Form</em>
      </button>
      <button onClick={(_) => setFormtype("hookReactValidation")}>
        Form with React validation
        <br />
        <em>using React Hook Form</em>
      </button>
      <button onClick={(_) => setFormtype("formikReactValidation")}>
        Form with React validation
        <br />
        <em>using Formik</em>
      </button>
      <button onClick={(_) => setFormtype("dynamic")}>
        Dynamic
        <br />
        <em>using React Hook Form</em>
      </button>
      <button onClick={(_) => setFormtype("uncontrolled")}>
        Uncontrolled
        <br />
        <em>using plain old React</em>
      </button>

      {formType === "htmlValidation" ? (
        <FormWithHtmlValidation />
      ) : formType === "hookReactValidation" ? (
        <FormWithReactValidation />
      ) : formType === "formikReactValidation" ? (
        <FormikFormWithReactValidation />
      ) : formType === "dynamic" ? (
        <DynamicForm
          inputs={[
            {
              id: "email",
              required: "Please provide an email address.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please provide a valid email address",
              },
            },
            {
              id: "password",
              required: "You must fill out your password",
              minLength: {
                value: 6,
                message:
                  "Your password must be at least 6 characters in length.",
              },
            },
            {
              dependencies: ["email", "password"],
              id: "age",
              min: {
                value: 0,
                message: "Age cannot be less than 0",
              },
              max: {
                value: 150,
                message: "Age cannot be greater than than 150",
              },
              text: "How old are you?",
              type: "number",
            },
          ]}
        />
      ) : formType === "uncontrolled" ? (
        <UncontrolledForm />
      ) : undefined}
    </>
  );
}

export default App;
