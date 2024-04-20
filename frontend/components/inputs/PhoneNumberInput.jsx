import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Box, Grid } from "@mui/material";
import { countries } from "@/constants/countries";
import {
  AsYouType,
  parsePhoneNumber,
  isValidPhoneNumber,
} from "libphonenumber-js";

const PhoneNumberInput = ({
  onChange,
  onValidation,
  defaultCountry = "PK",
  value,
  required = false,
  disabled,
}) => {
  const [country, setCountry] = useState({ code: defaultCountry || "PK" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isFocused, setFocused] = useState(false);

  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (onValidation) {
      onValidation(isValidPhoneNumber(value || "", country.code));
    }
  }, [value]);

  useEffect(() => {
    if (!isFocused) {
      try {
        setDisplayValue(PhoneNumber(value || "").formatNational());
      } catch (e) {
        setDisplayValue("");
      }
    }
  }, [value]);

  useEffect(() => {
    if (!isFocused && onChange) {
      try {
        onChange(PhoneNumber(displayValue).format("E.164"));
        setDisplayValue(PhoneNumber(displayValue).formatNational());
      } catch (e) {
        // throw invalid phone number error
        // onChange("")
      }
    }
  }, [country, isFocused]);

  /* Updating country */
  useEffect(() => {
    if (defaultCountry) {
      setCountry(countries.find(({ code }) => code === defaultCountry));
    }
  }, [defaultCountry]);

  // parse phone number correctly on blur
  const handleBlur = () => {
    setOpen(false);
    setFocused(false);
  };

  // parse phone number and return libphonejs object
  const PhoneNumber = (v = undefined) =>
    parsePhoneNumber(v, country.code || "PK");

  useEffect(() => {
    if (required && value === "") {
      setError(true);
      setHelperText("This field is required");
    } else if (required && value && !isValidPhoneNumber(value, country.code)) {
      setError(true);
      setHelperText("Invalid phone number");
    } else {
      setError(false);
      setHelperText("");
    }
  }, [value, country]);
  return (
    <Autocomplete
      className="autocomplete"
      fullWidth
      options={countries}
      disabled={disabled}
      value={country}
      onBlur={handleBlur}
      onChange={(_, val) => {
        if (val) {
          setCountry(val);
          setOpen(false);
        }
      }}
      open={open}
      autoHighlight
      getOptionLabel={(option) =>
        new AsYouType(country.code || "PK").input(displayValue)
      }
      renderOption={(props, option) => (
        <Box style={{ height: 50 }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png`}
            alt=""
          />
          &nbsp;&nbsp; (+{option.phone}) &nbsp;
          {option.label === undefined ? "" : option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          type="text"
          helperText={helperText}
          placeholder="Enter Phone Number"
          onFocus={() => setFocused(true)}
          value={displayValue}
          onChange={({ target }) => {
            setDisplayValue(target.value);
            if (open) {
              setOpen(!open);
            }
          }}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          onBlur={() => {
            if (required && !value) {
              setError(true);
              setHelperText("This field is required");
            }
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: <></>,
            sx: {
              border: error ? "1px solid red !important" : "none",
            },
            // onChange: ({ target }) => setPhoneNumber(target.value),
            // value: phoneNumber,
            startAdornment: (
              <Grid
                // align and justify content center
                alignItems="center"
                justifyContent="center"
                direction="column"
                spacing={1}
              >
                <Grid
                  item
                  style={{ fontSize: 12, cursor: "pointer" }}
                  onClick={() => setOpen(!open)}
                >
                  <img
                    width="25"
                    src={
                      country.code
                        ? `https://flagcdn.com/w20/${country.code?.toLowerCase()}.png`
                        : undefined
                    }
                    alt=""
                  />
                  &nbsp; +{country.phone}
                  &nbsp;&nbsp;
                  {open ? (
                    <i class="fa-solid fa-chevron-up" />
                  ) : (
                    <i class="fa-solid fa-chevron-down" />
                  )}
                </Grid>
              </Grid>
            ),
          }}
        />
      )}
    />
  );
};

export default PhoneNumberInput;
