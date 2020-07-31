import React from "react";
import Form from "./Form";
import Input from "./Input";

function DynamicForm(props) {
  return (
    <Form>
      {(formApi) => {
        return props.inputs.map(({ dependencies, id, type, ...config }) => {
          return (
            <Input
              disabled={
                dependencies &&
                !Object.values(formApi.watch(dependencies)).every(
                  (value) => !!value
                )
              }
              key={id}
              id={id}
              inputRef={formApi.register({ ...config })}
              type={type}
            />
          );
        });
      }}
    </Form>
  );
}

export default DynamicForm;
