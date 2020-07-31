import React from "react";
import Form from "./Form";

function StaticForm(props) {
  return (
    <Form>
      {/* Standard HTML validation doesn't trigger on blur for some reason... */}
      {(formApi) => {
        const areAuthQuestionsAnswered = !(formApi.watch("email") && formApi.watch("password"));
        return (
          <>
            <label htmlFor="email">Email</label>
            <br />
            <input
              name="email"
              ref={formApi.register}
              pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            />

            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              name="password"
              error={formApi.errors["password"]}
              ref={formApi.register}
              minLength={6}
            />

            <br />
            <label htmlFor="password">How old are you?</label>
            <br />
            <input
              disabled={areAuthQuestionsAnswered}
              error={formApi.errors["age"]}
              name="age"
              ref={formApi.register}
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
              ref={formApi.register}
              name="questionOne.currentPerformance"
              type="range"
              min={1}
              max={5}
            />
            <br />
            <label htmlFor="questionOne.desiredPerformance">Slider two</label>
            <br />
            <input
              ref={formApi.register}
              name="questionOne.desiredPerformance"
              type="range"
              min={1}
              max={5}
            />
            <br />
          </>
        );
      }}
    </Form>
  );
}

export default StaticForm;
