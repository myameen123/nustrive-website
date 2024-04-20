import React from "react";
import { Modal, Paper, IconButton, Grid } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
import { X } from "lucide-react";
import "./ModalLayout.css";
function ModalLayout({
  open,
  onClose,
  children,
  width = "400px",
  height = "630px",
  minHeight = "200px",
  borderRadius = "8px",
  closable = true,
  padding = "2rem",
}) {
  return (
    <Modal open={open} onClose={onClose} sx={{ zIndex: 1000 }}>
      <Paper
        className="modal-content-container"
        style={{
          width: width,
          // height: "550px",
          minHeight: minHeight,
          maxHeight: height,
          borderRadius: borderRadius,
          overflowX: "hidden", // Hide horizontal scrollbar
          padding: padding,
        }}
      >
        <Grid container justifyContent="flex-end" sx={{ mt: -3 }}>
          {closable && (
            <Grid item xs={12} sx={{ textAlign: "right", mr: -2 }}>
              <IconButton onClick={onClose}>
                <X />
              </IconButton>
            </Grid>
          )}
        </Grid>
        {children}
      </Paper>
    </Modal>
  );
}

export default ModalLayout;
