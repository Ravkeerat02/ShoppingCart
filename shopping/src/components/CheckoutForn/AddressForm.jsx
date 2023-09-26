import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { commerce } from "../../lib/commerce";
import FormInput from "./CustomTextField";

const AddressForm = () => {
  const methods = useForm();
  const [shippingSubDivision, setShippingSubDivision] = useState("");
  const [shippingSubDivisions, setShippingSubDivisions] = useState([]);
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState("");

  // Fetch shipping countries and subdivisions when the component mounts
  useEffect(() => {
    const fetchShippingCountries = async () => {
      const { countries } =
        await commerce.services.localeListShippingCountries();

      setShippingCountries(countries);
      setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchShippingSubdivisions = async (countryCode) => {
      const { subdivisions } = await commerce.services.localeListSubdivisions(
        countryCode
      );

      setShippingSubDivisions(subdivisions);
      setShippingSubDivision(Object.keys(subdivisions)[0]);
    };

    // Fetch shipping countries initially
    fetchShippingCountries();
  }, []);

  // Fetch shipping options whenever the selected country or subdivision changes
  useEffect(() => {
    if (shippingCountry && shippingSubDivision) {
      const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(
          checkoutTokenId,
          {
            country,
            region,
          }
        );

        setShippingOptions(options);
        setShippingOption(options[0]?.id);
      };

      // You need to fetch a checkout token first. Replace 'checkoutTokenId' with your actual token.
      const checkoutTokenId = "your_checkout_token_id";

      fetchShippingOptions(
        checkoutTokenId,
        shippingCountry,
        shippingSubDivision
      );
    }
  }, [shippingCountry, shippingSubDivision]);

  const handleSubmit = (data) => {
    // Handle form submission with the form data
    console.log(data);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <Grid container spacing={3}>
            <FormInput required name="firstName" label="First Name" />
            <FormInput required name="lastName" label="Last Name" />
            <FormInput required name="address1" label="Address" />
            <FormInput required name="city" label="City" />
            <FormInput required name="zip" label="ZIP / Postal Code" />
            <FormInput required name="email" label="Email" />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {Object.entries(shippingSubDivisions).map(([code, name]) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.description} - {option.price.formatted_with_symbol}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          {/* Add a submit button */}
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
