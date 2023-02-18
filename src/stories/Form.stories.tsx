import React from "react";
import { Story, Meta } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { yupResolver } from "@hookform/resolvers/yup";
import Form, { schema, FormData } from "../NewApplicationForm/Form";
import { useForm } from "react-hook-form";

export default {
  title: "Form",
  component: Form,
} as Meta;

const Template: Story = () => {
  const { control, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    action("onSubmit")(data);
  };

  return (
    <Form
    // control={control}
    // handleSubmit={handleSubmit(onSubmit)}
    // formState={formState}
    />
  );
};

export const Default = Template.bind({});
