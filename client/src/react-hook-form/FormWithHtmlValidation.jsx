import React from "react";
import Form from "../common/Form";
import { useForm } from "react-hook-form";

function FormWithHtmlValidation(props) {
  const { handleSubmit, errors, formState, register, watch } = useForm({
    mode: "onBlur", // This doesn't trigger if you just tab past the input without typing.
  });

  const areAuthQuestionsAnswered = !(watch("email") && watch("password"));

  return (
    <Form
      errors={errors}
      onSubmit={(event, setSubmitted) => {
        handleSubmit(async (values) => {
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
      {/* Standard HTML validation doesn't trigger on blur for some reason... */}
      <label htmlFor="email">Email</label>
      <br />
      <input
        name="email"
        ref={register}
        pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        required
      />

      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input name="password" ref={register} minLength={6} required />

      <br />
      <label htmlFor="age">How old are you?</label>
      <br />
      <input
        disabled={areAuthQuestionsAnswered}
        name="age"
        ref={register}
        min={0}
        max={150}
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

export default FormWithHtmlValidation;
