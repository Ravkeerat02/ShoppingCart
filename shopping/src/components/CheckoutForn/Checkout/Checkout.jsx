import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useForm, FormProvider, Controller } from "react-hook-form";
import FormInput from "../CustomTextField";

const AddressForm = () => {
  const methods = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can perform form submission logic here.
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Shipping Address
        </Typography>
        <Grid container spacing={3}>
          <FormInputField
            name="firstName"
            label="First Name"
            control={methods.control}
          />
          {/* Add more FormInputField components for other fields */}
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

const FormInputField = ({ name, label, control }) => (
  <Grid item xs={12} sm={6}>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => <FormInput {...field} label={label} />}
    />
  </Grid>
);

export default AddressForm;
