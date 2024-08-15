"use client";
import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
// import isEmail from "validator/lib/isemail";
// import isEmail from "validator/lib/isemail";
function CustomTextField({
  label,
  placeholder,
  name,
  variant = "outlined",
  fullWidth = true,
  value,
  color,
  onChange,
  sx = {},
  InputLabelProps = {},
  InputProps = {},
  size,
  height,
  disabled,
  required = false,
  minLength,
  type = "text",
  password,
  // errorCheck,
}) {
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      validate();
    }
  }, [value, required, minLength]);
  const handleBlur = () => {
    setTouched(true); // Set the field as touched when onBlur is triggered

    if (required && value === "") {
      setError(true);
      setHelperText("This field is required");
    }
  };
  const validate = () => {
    if (required && value === "") {
      setError(true);
      setHelperText("This field is required");
    } else if (required && minLength && value?.length < minLength) {
      setError(true);
      setHelperText(`This field must be at least ${minLength}`);
    } else if (password) {
      if (password !== value) {
        setError(true);
        setHelperText("Password not match!");
      } else {
        setError(false);
        setHelperText("");
      }
    } else {
      setError(false);
      setHelperText("");
    }
  };
  return (
    <TextField
      error={error}
      name={name}
      type={type}
      // id="outlinded-error"
      label={label}
      placeholder={placeholder}
      value={value}
      color={color}
      disabled={disabled}
      fullWidth={fullWidth}
      size={size}
      onBlur={handleBlur}
      InputLabelProps={{
        ...InputLabelProps,
        style: { color: "#000", ...InputLabelProps?.style },
        sx: { height, ...InputLabelProps?.sx },
      }}
      onChange={onChange}
      sx={{ height, ...sx }}
      InputProps={{
        ...InputProps,
        value,
        onChange,
        disabled,
        sx: {
          height,
          border: error ? "1px solid red !important" : "none",
          ...InputProps?.sx,
        },
      }}
      helperText={helperText}
      required={required}
    />
  );
}

export default CustomTextField;
