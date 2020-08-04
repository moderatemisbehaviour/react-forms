import React from "react";
import { useForm } from "react-hook-form";
import Form from "../common/Form";
import Question from "../common/Question";

function FormWithReactValidation(props) {
  const { handleSubmit, errors, formState, register, watch } = useForm({
    mode: "onBlur", // This doesn't trigger if you just tab past the input without typing.
  });

  const areAuthQuestionsAnswered = !(watch("email") && watch("password"));

  return (
    <Form
      errors={errors}
      onSubmit={(event, setSubmitted) => {
        handleSubmit(async values => {
          await new Promise((resolve, __) => {
            setTimeout(() => {
              resolve();
              alert(JSON.stringify(values, null, 2));
            }, 1000);
          });
          setSubmitted(true);
        })(event);
      }}
      isSubmitting={formState.isSubmitting}
    >
      <Question
        id="email"
        error={errors["email"] && errors["email"].message}
        inputRef={register({
          required: "Please provide an email address.",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Please provide a valid email address",
          },
        })}
      />

      <Question
        id="password"
        error={errors["password"] && errors["password"].message}
        inputRef={register({
          required: "You must fill out your password",
          minLength: {
            value: 6,
            message: "Your password must be at least 6 characters in length.",
          },
        })}
      />

      <Question
        disabled={areAuthQuestionsAnswered}
        error={errors["age"] && errors["age"].message}
        id="age"
        inputRef={register({
          min: {
            value: 0,
            message: "Age cannot be less than 0",
          },
          max: {
            value: 150,
            message: "Age cannot be greater than than 150",
          },
        })}
        text="How old are you?"
        type="number"
      />

      <div>How do you like these sliders?</div>
      <br />
      <label htmlFor="questionOne.currentPerformance">Slider one</label>
      <br />
      <input
        ref={register}
        name="questionOne.currentPerformance"
        type="range"
        min={1}
        max={5}
      />
      <br />
      <label htmlFor="questionOne.desiredPerformance">Slider two</label>
      <br />
      <input
        ref={register}
        name="questionOne.desiredPerformance"
        type="range"
        min={1}
        max={5}
      />
      <br />
    </Form>
  );
}

export default FormWithReactValidation;
