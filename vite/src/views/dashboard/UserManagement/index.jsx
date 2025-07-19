import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, Person as PersonIcon } from '@mui/icons-material';
import { userService } from 'api/user';

const UserManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
    phone: '',
    address: '',
    profileImage: null
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response);
    } catch (error) {
      showMessage('error', 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setOpenSnackbar(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showMessage('error', 'Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        showMessage('error', 'Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'user',
      status: 'active',
      phone: '',
      address: '',
      profileImage: null
    });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataToSend = { ...formData };
      if (!isEditing && !dataToSend.password) {
        showMessage('error', 'Password is required for new users');
        setLoading(false);
        return;
      }
      if (isEditing && !dataToSend.password) {
        delete dataToSend.password;
      }
      if (isEditing) {
        await userService.updateUser(selectedUser._id, dataToSend);
        showMessage('success', 'User updated successfully!');
      } else {
        await userService.register(dataToSend);
        showMessage('success', 'User created successfully!');
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      showMessage('error', error.error || 'Failed to save user');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      status: user.status,
      phone: user.phone || '',
      address: user.address || '',
      profileImage: null
    });
    setImagePreview(user.profileImage ? (user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:5000/${user.profileImage.replace(/^\\?/, '')}`) : null);
    setIsEditing(true);
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      setLoading(true);
      await userService.deleteUser(userId);
      showMessage('success', 'User deleted successfully');
      fetchUsers();
      if (selectedUser?._id === userId) {
        resetForm();
      }
    } catch (error) {
      showMessage('error', 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUserDetails(user);
    setViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialog(false);
    setSelectedUserDetails(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              {!isEditing && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}
              {isEditing && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Password (leave blank to keep current)"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
              )}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    label="Role"
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    label="Status"
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                  />
                  <Button
                    variant="outlined"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Profile Image
                  </Button>
                  {imagePreview && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Avatar
                        src={imagePreview}
                        alt="Preview"
                        sx={{ width: 80, height: 80, margin: 'auto' }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                  >
                    {loading ? 'Saving...' : isEditing ? 'Update User' : 'Create User'}
                  </Button>
                  {isEditing && (
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      onClick={resetForm}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All Users
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      {user.profileImage ? (
                        <Avatar
                          src={user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:5000/${user.profileImage.replace(/^\\?/, '')}`}
                          alt={user.name}
                          sx={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <Avatar sx={{ width: 40, height: 40 }}>
                          <PersonIcon />
                        </Avatar>
                      )}
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip label={user.role} color={user.role === 'admin' ? 'primary' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>
                      <Chip label={user.status} color={user.status === 'active' ? 'success' : 'default'} size="small" />
                    </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton onClick={() => handleView(user)} disabled={loading}>
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(user)} disabled={loading}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(user._id)} disabled={loading} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
      <Dialog open={viewDialog} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUserDetails && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                {selectedUserDetails.profileImage ? (
                  <Avatar
                    src={selectedUserDetails.profileImage.startsWith('http') ? selectedUserDetails.profileImage : `http://localhost:5000/${selectedUserDetails.profileImage.replace(/^\\?/, '')}`}
                    alt={selectedUserDetails.name}
                    sx={{ width: 80, height: 80, margin: 'auto' }}
                  />
                ) : (
                  <Avatar sx={{ width: 80, height: 80, margin: 'auto' }}>
                    <PersonIcon />
                  </Avatar>
                )}
              </Box>
              <Typography variant="h6" align="center">{selectedUserDetails.name}</Typography>
              <Typography variant="subtitle1" align="center">{selectedUserDetails.email}</Typography>
              <Typography variant="body2" align="center">Role: {selectedUserDetails.role}</Typography>
              <Typography variant="body2" align="center">Status: {selectedUserDetails.status}</Typography>
              <Typography variant="body2" align="center">Phone: {selectedUserDetails.phone}</Typography>
              <Typography variant="body2" align="center">Address: {selectedUserDetails.address}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message.type}
          sx={{ width: '100%' }}
        >
          {message.text}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default UserManagement; 