import React from "react";
import Input from "./Input";
import Form from "./Form";

function StaticForm(props) {
  return (
    <Form>
      {/* Standard HTML validation doesn't trigger on blur for some reason... */}
      {(formApi) => {
        const areAuthQuestionsAnswered = !(formApi.watch("email") && formApi.watch("password"));
        console.log(Object.values(formApi.watch(['email', 'password'])).every(value => !!value))
        return (
          <>
            <Input
              id="email"
              error={formApi.errors["email"]}
              inputRef={formApi.register({
                required: "Please provide an email address.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Please provide a valid email address'
                }
              })}
            />

            <Input
              id="password"
              error={formApi.errors["password"]}
              inputRef={formApi.register({
                required: 'You must fill out your password',
                minLength: {
                  value: 6,
                  message: 'Your password must be at least 6 characters in length.'
                }
              })}
            />

            <Input
              disabled={areAuthQuestionsAnswered}
              error={formApi.errors["age"]}
              id="age"
              inputRef={formApi.register({
                min: {
                  value: 0,
                  message: 'Age cannot be less than 0'
                },
                max: {
                  value: 150,
                  message: 'Age cannot be greater than than 150'
                }
              })}
              text='How old are you?'
              type='number'
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
