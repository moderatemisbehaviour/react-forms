import React from "react";
import Form from "../common/Form";
import Input from "../common/Question";
import { useForm } from "react-hook-form";

function DynamicForm(props) {
  const { handleSubmit, errors, formState, register, watch } = useForm({
    mode: "onBlur", // This doesn't trigger if you just tab past the input without typing.
  });

  // const areAuthQuestionsAnswered = !(watch("email") && watch("password"));

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
      {props.inputs.map(({ dependencies, id, type, ...config }) => (
        <Input
          disabled={
            dependencies &&
            !Object.values(watch(dependencies)).every((value) => !!value)
          }
          error={errors[id] && errors[id].message}
          key={id}
          id={id}
          inputRef={register({ ...config })}
          type={type}
        />
      ))}
    </Form>
  );
}

export default DynamicForm;
