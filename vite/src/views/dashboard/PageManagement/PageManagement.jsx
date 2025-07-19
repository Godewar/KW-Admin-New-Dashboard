import React, { useEffect, useState } from 'react';
import axios from 'axios';

const defaultForm = {
  pageName: '',
  backgroundOverlayContent: '',
  backgroundImage: null,
};

const bannerPageNames = [
  'Home Page', 'Properties', 'Active Properties', 'Sold Properties', 'Rent Properties',
  'Auction Properties', 'New Development Properties', 'Market Center', 'Agent', 'Seller',
  'Buyer', 'Tenant', 'Franchise', 'Our Culture', 'Seller Guide', 'Buyer Guide', 'Tenant Guide',
  'KW Training', 'Jasmin', 'Jeddah', 'Five Steps To Sell', 'About Us', 'Contact Us', 'Join Us',
  'Instant Valuation', 'Why KW', 'KW Technology', 'KW University', 'Events', 'News'
];

export default function PageManagement() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  // Fetch all pages for the table
  const fetchPages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/pages');
      setPages(res.data);
    } catch (e) {
      setPages([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPages();
  }, []);

  // Open form for add or edit
  const handleOpen = (page = defaultForm) => {
    if (page && page._id) {
      setForm({
        pageName: page.pageName || '',
        backgroundOverlayContent: page.backgroundOverlayContent || '',
        backgroundImage: null, // Don't prefill file input
      });
      setEditId(page._id);
    } else {
      setForm(defaultForm);
      setEditId(null);
    }
    setOpen(true);
  };

  // Close form
  const handleClose = () => {
    setForm(defaultForm);
    setEditId(null);
    setOpen(false);
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Save (create or update) a page
  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });
      if (editId) {
        await axios.put(`http://localhost:5000/api/page/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:5000/api/page', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      await fetchPages();
      handleClose();
    } catch (e) {
      console.error('Error saving page:', e, e.response?.data);
      if (e.response?.data?.error) {
        alert('Error: ' + e.response.data.error + (e.response.data.details ? ('\n' + e.response.data.details) : ''));
      } else {
        alert('Error saving page');
      }
    }
  };

  // Delete a page
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/page/${deleteId}`);
      await fetchPages();
      setDeleteDialog(false);
      setDeleteId(null);
    } catch (e) {
      alert('Error deleting page');
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Page Management</h2>
      <button onClick={() => handleOpen()}>Add Page</button>
      <table border="1" cellPadding="8" style={{ width: '100%', marginTop: 16 }}>
        <thead>
          <tr>
            <th>Page Name</th>
            <th>Overlay Content</th>
            <th>Background Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {pages.map((row) => (
            <tr key={row._id}>
              <td>{row.pageName}</td>
              <td>{row.backgroundOverlayContent}</td>
              <td>
                {row.backgroundImage && (
                  <img
                    src={`http://localhost:5000/${row.backgroundImage.replace(/\\/g, '/')}`}
                    alt="bg"
                    style={{ width: 80, height: 40, objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <button onClick={() => handleOpen(row)}>Edit</button>
                <button onClick={() => { setDeleteId(row._id); setDeleteDialog(true); }}>Delete</button>
              </td>
            </tr>
            ))}
            {pages.length === 0 && (
            <tr>
              <td colSpan={4} align="center">No pages found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Add/Edit Dialog */}
      {open && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', padding: 28, borderRadius: 10, minWidth: 480, maxWidth: '90vw' }}>
            <h3 style={{ marginBottom: 32 }}>{editId ? 'Edit Page' : 'Add Page'}</h3>
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>Page Name:</label>
                <select name="pageName" value={form.pageName} onChange={handleChange} required style={{ width: '100%', padding: 8, fontSize: 16 }}>
                  <option value="">Select a page name</option>
                  {bannerPageNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>Background Overlay Content:</label>
                <textarea
                  name="backgroundOverlayContent"
                  value={form.backgroundOverlayContent}
                  onChange={handleChange}
                  rows={6}
                  style={{ width: '100%', padding: 10, fontSize: 16, resize: 'vertical', minHeight: 120 }}
                />
              </div>
              <div style={{ marginBottom: 32 }}>
                <label style={{ display: 'block', marginBottom: 8 }}>Background Image:</label>
                <input
                  type="file"
                  name="backgroundImage"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ fontSize: 16 }}
                />
                {form.backgroundImage && typeof form.backgroundImage === 'object' && (
                  <span style={{ marginLeft: 12 }}>{form.backgroundImage.name}</span>
                )}
              </div>
              <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
                <button type="button" onClick={handleClose} style={{ padding: '10px 24px', fontSize: 16 }}>Cancel</button>
                <button type="submit" style={{ marginLeft: 8, padding: '10px 24px', fontSize: 16 }}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialog && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#fff', padding: 24, borderRadius: 8 }}>
            <h3>Delete Page</h3>
            <p>Are you sure you want to delete this page?</p>
            <button onClick={() => setDeleteDialog(false)}>Cancel</button>
            <button onClick={handleDelete} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
} 