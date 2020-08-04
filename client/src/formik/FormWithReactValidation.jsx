import React from "react";
import Question from "../common/Question";
import { Formik } from "formik";
import Form from "../common/Form";

function FormWithReactValidation() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Please provide an email address.";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }

        if (!values.password) {
          errors.password = "You must fill out your password";
        } else if (values.password.length < 6) {
          errors.password =
            "Your password must be at least 6 characters in length.";
        }

        if (values.age) {
          if (values.age < 0) errors.age = "Age cannot be less than 0";
          if (values.age > 150) errors.age = "Age cannot be greater than 150";
        }
        return errors;
      }}
      onSubmit={async (values) => {
        await new Promise((resolve, __) => {
          setTimeout(() => {
            resolve();
            alert(JSON.stringify(values, null, 2));
          }, 1000);
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => {
        const areAuthQuestionsAnswered = !(values.email && values.password);

        return (
          <Form
            errors={errors}
            onSubmit={async (event, setSubmitted) => {
              await handleSubmit(); // For some reason it doens't wait for this.
              setSubmitted(true);
            }}
            isSubmitting={isSubmitting}
          >
            <Question
              id="email"
              error={errors.email && touched.email && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />

            <Question
              id="password"
              error={errors.password && touched.password && errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />

            <Question
              disabled={areAuthQuestionsAnswered}
              error={errors.age && touched.age && errors.age}
              id="age"
              text="How old are you?"
              type="number"
            />

            <div>How do you like these sliders?</div>
            <br />
            <label htmlFor="questionOne.currentPerformance">Slider one</label>
            <br />
            <input
              name="questionOne.currentPerformance"
              type="range"
              min={1}
              max={5}
            />
            <br />
            <label htmlFor="questionOne.desiredPerformance">Slider two</label>
            <br />
            <input
              name="questionOne.desiredPerformance"
              type="range"
              min={1}
              max={5}
            />
            <br />
          </Form>
        );
      }}
    </Formik>
  );
}

export default FormWithReactValidation;
