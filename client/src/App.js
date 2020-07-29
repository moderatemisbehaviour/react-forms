import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => console.log(values); // handleSubmit wrapper means this doesn't get called if there are errors.

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="question">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          ref={register({
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        {errors.email && errors.email.message}
      </div>

      <div className="question">
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          ref={register()}
        />
        {errors.password && errors.password.message}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
