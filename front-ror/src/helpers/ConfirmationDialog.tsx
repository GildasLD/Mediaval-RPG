// ConfirmationDialog.tsx
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";

interface ConfirmationDialogProps {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  content,
  open,
  onClose,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography
          sx={{
            px: 2,
          }}
          variant="h6"
          component="div"
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            color: "#272727",
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            minWidth: 300,
          }}
        >
          <Typography variant="h6">{content}</Typography>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
