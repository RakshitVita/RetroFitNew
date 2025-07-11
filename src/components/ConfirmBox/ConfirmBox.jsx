// components/ConfirmDialog.jsx
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const ConfirmBox = ({
  open,
  title = "Do u want to proceed?",
  subtitle,
  fileList = [],
  flag = true,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 6,
          },
        },
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(to right, #0052D4, #4364F7)",
          padding: 3,
          color: "white",
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      >
        <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold", padding: 0 }}>
          {title}
        </DialogTitle>
        <Typography sx={{ mt: 1, fontSize: "0.95rem", opacity: 0.9 }}>
          {subtitle}
        </Typography>
      </Box>

      

      {Array.isArray(fileList) && fileList.length > 0 &&  (
              <DialogContent sx={{ backgroundColor: "#f9f9f9", maxHeight: 300 }}>
        <Box
          sx={{
            padding: 2,
            backgroundColor: "#f1f1f1",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "0.875rem",
            maxHeight: 200,
            overflowY: "auto",
          }}
        >
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {fileList.map((file, idx) => (
              <li key={idx}>{file}</li>
            ))}
          </ul>
        </Box>
      </DialogContent>
      )}
      <DialogActions sx={{ justifyContent: "center", paddingBottom: 3 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{ backgroundColor: "#1b873f", borderRadius: 8, minWidth: 100 }}
          disabled={!flag}
        >
          Yes
        </Button>
        <Button
          onClick={onCancel}
          variant="contained"
          sx={{ backgroundColor: "#d32f2f", borderRadius: 8, minWidth: 100 }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog >
  );
};

export default ConfirmBox;
