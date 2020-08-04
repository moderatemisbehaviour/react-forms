import React from "react";

function Question(props) {
  return (
    <div className="input">
      <label htmlFor={props.id}>{props.text || toTitleCase(props.id)}</label>
      <br />
      <input
        disabled={props.disabled}
        name={props.id}
        onChange={props.onChange}
        onBlur={props.onBlur}
        ref={props.inputRef}
        type={props.type || "text"}
        value={props.value}
      />
      <br />
      {props.error && <span>{props.error}</span>}
    </div>
  );
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export default Question;
