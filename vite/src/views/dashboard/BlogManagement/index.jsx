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
  Chip,
  Avatar
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as ViewIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { blogService } from 'api/blog';

const BlogManagement = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    tags: [],
    coverImage: null,
    isPublished: false
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedBlogContent, setSelectedBlogContent] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllBlogs();

      console.log(response);
      setBlogs(response);
    } catch (error) {
      showMessage('error', 'Failed to fetch blogs');
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
      [name]: name === 'isPublished' ? (value === 'published') : value
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
        coverImage: file
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      author: '',
      tags: [],
      coverImage: null,
      isPublished: false
    });
    setImagePreview(null);
    setIsEditing(false);
    setSelectedBlog(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      if (formData.author) formDataToSend.append('author', formData.author);
      formData.tags.forEach(tag => formDataToSend.append('tags', tag));
      if (formData.coverImage) formDataToSend.append('coverImage', formData.coverImage);
      formDataToSend.append('isPublished', formData.isPublished ? 'true' : 'false');
      formDataToSend.append('publishedAt', ''); // Assuming publishedAt is not directly editable from this form

      if (isEditing) {
        await blogService.updateBlog(selectedBlog._id, formDataToSend);
        showMessage('success', 'Blog updated successfully!');
      } else {
        await blogService.createBlog(formDataToSend);
        showMessage('success', 'Blog created successfully!');
      }
      resetForm();
      fetchBlogs();
    } catch (error) {
      showMessage('error', error.error || 'Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      tags: blog.tags,
      coverImage: null,
      isPublished: blog.isPublished
    });
    setImagePreview(blog.coverImage);
    setIsEditing(true);
  };

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) {
      return;
    }

    try {
      setLoading(true);
      await blogService.deleteBlog(blogId);
      showMessage('success', 'Blog deleted successfully');
      fetchBlogs();
      if (selectedBlog?._id === blogId) {
        resetForm();
      }
    } catch (error) {
      showMessage('error', 'Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (blog) => {
    setSelectedBlogContent(blog);
    setViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setViewDialog(false);
    setSelectedBlogContent(null);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Blog Management
      </Typography>

      {/* Blog Form */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  multiline
                  rows={8}
                  required
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
                    startIcon={<CloudUploadIcon />}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload Cover Image
                  </Button>
                  {imagePreview && (
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain'
                        }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Add Tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  helperText="Press Enter to add a tag"
                />
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => removeTag(tag)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={formData.isPublished ? 'published' : 'draft'}
                    label="Status"
                    name="isPublished"
                    onChange={handleChange}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="published">Published</MenuItem>
                  </Select>
                </FormControl>
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
                    {loading ? 'Saving...' : isEditing ? 'Update Blog' : 'Create Blog'}
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

      {/* Blogs Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All Blogs
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      {blog.coverImage && (
                        <Avatar
                          src={`http://localhost:5000/${blog.coverImage}`}
                          alt={blog.title}
                          sx={{ width: 50, height: 50 }}
                          variant="rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <Chip
                        label={blog.isPublished ? 'Published' : 'Draft'}
                        color={blog.isPublished ? 'success' : 'default'}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => handleView(blog)}
                          disabled={loading}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => handleEdit(blog)}
                          disabled={loading}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(blog._id)}
                          disabled={loading}
                          color="error"
                        >
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

      {/* View Blog Dialog */}
      <Dialog
        open={viewDialog}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedBlogContent?.title}
        </DialogTitle>
        <DialogContent>
          {selectedBlogContent && (
            <Box sx={{ mt: 2 }}>
              {selectedBlogContent.coverImage && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={`http://localhost:5000/${selectedBlogContent.coverImage}`}
                    alt={selectedBlogContent.title}
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                  />
                </Box>
              )}
              <Typography variant="subtitle1" gutterBottom>
                By {selectedBlogContent.author}
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                {selectedBlogContent.content}
              </Typography>
              {selectedBlogContent.tags?.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {selectedBlogContent.tags.map((tag) => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Box>
              )}
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

export default BlogManagement; 