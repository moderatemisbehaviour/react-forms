import React, { useState } from "react";

function Form(props) {
  const [isSubmitted, setSubmitted] = useState();

  return (
    <>
      {isSubmitted ? (
        <div>Submitted! Thanks.</div>
      ) : (
        <form onSubmit={event => {
          props.onSubmit(event, setSubmitted);
          event.preventDefault();
        }}>
          {props.children}

          <button type="submit">Submit</button>

          {props.isSubmitting && <div>Submitting...</div>}
          {isSubmitted &&
            Object.values(props.errors).map((error, index) => (
              <div key={index}>{error}</div>
            ))}
        </form>
      )}
    </>
  );
}

export default Form;
