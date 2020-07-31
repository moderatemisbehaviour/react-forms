import React from "react";

function Input(props) {
  return (
    <div className="input">
      <label htmlFor={props.id}>{props.text || toTitleCase(props.id)}</label>
      <br />
      <input
        disabled={props.disabled}
        name={props.id}
        ref={props.inputRef}
        type={props.type || "text"}
      />
      <br />
      {props.error && <span>{props.error.message}</span>}
    </div>
  );
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default Input;
