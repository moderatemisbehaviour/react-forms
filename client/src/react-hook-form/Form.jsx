import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Form(props) {
  const [isSubmitted, setSubmitted] = useState();

  const formApi = useForm({
    mode: "onBlur", // This doesn't trigger if you just tab past the input without typing.
  });
  const { handleSubmit, errors, formState } = formApi;
  const onSubmit = async (values) => {
    console.debug("Submitting...", values);
    await new Promise((resolve, __) => {
      setTimeout(resolve, 1000);
    });
    setSubmitted(true);
  };

  return (
    <>
      {isSubmitted ? (
        <div>Submitted! Thanks.</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Standard HTML validation doesn't trigger on blur for some reason... */}
          {props.children(formApi)}

          <button type="submit">Submit</button>

          {formState.isSubmitting && <div>Submitting...</div>}
          {formState.isSubmitted &&
            Object.values(errors).map((error, index) => (
              <div key={index}>{error.message}</div>
            ))}
        </form>
      )}
    </>
  );
}

export default Form;
