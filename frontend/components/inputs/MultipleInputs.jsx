"use client";
import React from "react";
import { Box, TextField, Autocomplete, Chip } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

// const {
//   handleSubmit,
//   formState: { errors },
// } = useForm();

function MultipleInputs() {
  const {
    control,
    // register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  return (
    <Box>
      <Controller
        control={control}
        name="tags"
        rules={{
          required: "This is required",
        }}
        render={({ field: { onChange } }) => (
          <Autocomplete
            // defaultValue={
            //   useCasesData?.tags ? JSON.parse(useCasesData?.tags) : []
            // }
            multiple
            id="tags-filled"
            options={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  key={index}
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            onChange={(event, values) => {
              onChange(values);
            }}
            renderInput={(params) => (
              <TextField
                size="small"
                {...params}
                label="Medical hours"
                placeholder="Enter time like 9:00"
                helperText={errors.tags?.message}
                error={!!errors.tags}
              />
            )}
          />
        )}
      />
    </Box>
  );
}

export default MultipleInputs;
