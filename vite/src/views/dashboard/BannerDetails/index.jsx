import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Container,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  Alert,
} from '@mui/material';

const BannerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { image, title } = location.state || {};

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSnackbar({ open: true, message: `${file.name} selected.`, severity: 'info' });
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    setOpenDeleteDialog(false);
    setSnackbar({ open: true, message: 'Banner deleted.', severity: 'warning' });
    setTimeout(() => navigate(-1), 1000);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      setSnackbar({ open: true, message: `Submitted: ${selectedFile.name}`, severity: 'success' });
    } else {
      setSnackbar({ open: true, message: 'No file selected.', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        🖼️ Banner Details
      </Typography>

      {image ? (
        <Card sx={{ mt: 4 }}>
          <CardMedia
            component="img"
            image={image}
            alt={title || 'Banner'}
            sx={{ height: 200, objectFit: 'cover' }}
          />
        </Card>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No image data provided.
        </Typography>
      )}

      <Box sx={{ mt: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          {isUpdating && (
            <Button component="label" variant="outlined" color="secondary">
              Choose File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          )}
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>

         
        </Stack>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this banner? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BannerDetails;
