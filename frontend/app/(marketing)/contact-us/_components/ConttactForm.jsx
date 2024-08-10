"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "100vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <button className=" w-fit py-2 px-3 bg-[#4463FB] text-white rounded-[5px] hover:bg-[#4463FB]/90">
            Submit
          </button>
        </form>
      </Box>
    </Box>
  );
}
