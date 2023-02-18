import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { action } from "@storybook/addon-actions";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  NewApplicationForm,
  NewApplicationFormData,
  newApplicationFormValidationSchema,
} from "../NewApplicationForm";
import { useForm } from "react-hook-form";

export default {
  title: "NewApplicationForm",
  component: NewApplicationForm,
} as Meta;

const Template: Story = () => {
  const { control, handleSubmit, formState } = useForm<NewApplicationFormData>({
    resolver: yupResolver(newApplicationFormValidationSchema),
  });

  const onSubmit = (data: NewApplicationFormData) => {
    action("onSubmit")(data);
  };

  return (
    <NewApplicationForm
    // control={control}
    // handleSubmit={handleSubmit(onSubmit)}
    // formState={formState}
    />
  );
};

export const Default = Template.bind({});
