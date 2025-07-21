import React, { useState, useEffect } from 'react';
import { Box, Stack, Button, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Leads() {
  const [activePage, setActivePage] = useState('contactus');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all leads from API
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/api/leads');
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (err) {
        setLeads([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Map backend fields to DataGrid rows for each tab
  const getRowsForTab = (tab) => {
    let filtered = leads.filter(lead => {
      if (tab === 'contactus') return lead.formType === 'contact-us';
      if (tab === 'jasmin') return lead.formType === 'jasmin';
      if (tab === 'jeddah') return lead.formType === 'jeddah';
      if (tab === 'franchise') return lead.formType === 'franchise';
      return false;
    });
    // Map to DataGrid row format
    return filtered.map((lead, idx) => {
      if (tab === 'contactus') {
        return {
          id: lead._id || idx,
          fullName: lead.fullName || '',
          mobileNumber: lead.mobileNumber || '',
          email: lead.email || '',
          city: lead.city || '',
          imageUrl: lead.imageUrl ? (<a href={`/${lead.imageUrl}`} target="_blank" rel="noopener noreferrer">View</a>) : '-',
          message: lead.message || '',
          createdAt: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '',
        };
      }
      if (tab === 'jasmin' || tab === 'jeddah') {
        return {
          id: lead._id || idx,
          firstName: lead.firstName || '',
          lastName: lead.lastName || '',
          email: lead.email || '',
          addressTo: lead.addressTo || '',
          message: lead.message || '',
        };
      }
      if (tab === 'franchise') {
        return {
          id: lead._id || idx,
          fullName: lead.fullName || '',
          surname: lead.surname || '',
          companyName: lead.companyName || '',
          mobileNumber: lead.mobileNumber || '',
          email: lead.email || '',
          city: lead.city || '',
          dob: lead.dob ? new Date(lead.dob).toLocaleDateString() : '',
          educationStatus: lead.educationStatus || '',
          province: lead.province || '',
          hearAboutUs: lead.hearAboutUs || '',
          promotionalConsent: lead.promotionalConsent ? 'Yes' : 'No',
          personalDataConsent: lead.personalDataConsent ? 'Yes' : 'No',
          message: lead.message || '',
          createdAt: lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : '',
        };
      }
      return {};
    });
  };

  const columnsByTab = {
    contactus: [
      { field: "fullName", headerName: "Full Name", width: 150 },
      { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "city", headerName: "City", width: 120 },
      { field: "imageUrl", headerName: "Image", width: 100 },
      { field: "message", headerName: "Message", width: 200 },
      { field: "createdAt", headerName: "Date", width: 120 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 120,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '100px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View
          </Button>
        )
      },
    ],
    jasmin: [
      { field: "firstName", headerName: "First Name", width: 150 },
      { field: "lastName", headerName: "Last Name", width: 120 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "addressTo", headerName: "Address To", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 120,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '100px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View
          </Button>
        )
      },
    ],
    jeddah: [
      { field: "firstName", headerName: "First Name", width: 150 },
      { field: "lastName", headerName: "Last Name", width: 120 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "addressTo", headerName: "Address To", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 120,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '100px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View
          </Button>
        )
      },
    ],
    franchise: [
      { field: "fullName", headerName: "Full Name", width: 150 },
      { field: "surname", headerName: "Surname", width: 120 },
      { field: "companyName", headerName: "Company Name", width: 150 },
      { field: "mobileNumber", headerName: "Mobile Number", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "city", headerName: "City", width: 120 },
      { field: "dob", headerName: "Date of Birth", width: 120 },
      { field: "educationStatus", headerName: "Education Status", width: 150 },
      { field: "province", headerName: "Province", width: 120 },
      { field: "hearAboutUs", headerName: "How Did You Hear About Us", width: 200 },
      { field: "promotionalConsent", headerName: "Promotional Consent", width: 150 },
      { field: "personalDataConsent", headerName: "Personal Data Consent", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { field: "createdAt", headerName: "Date", width: 120 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 120,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '100px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View
          </Button>
        )
      },
      ],
  };

  const menuItems = [
    { key: 'jasmin', label: 'Jasmin', color: '#e91e63' },
    { key: 'jeddah', label: 'Jeddah', color: '#2196f3' },
    { key: 'franchise', label: 'Franchise', color: '#00bcd4' },
    { key: 'contactus', label: 'Contact Us', color: '#4caf50' },
  ];

  const renderPage = () => {
    let rows = getRowsForTab(activePage);
    const columns = columnsByTab[activePage] || [];
    // Filter rows based on search query
    if (searchQuery.trim()) {
      rows = rows.filter(row => {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }
    return (
      <Box>
        <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
          {menuItems.find(item => item.key === activePage)?.label || ''} Data
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            disableSelectionOnClick
            autoHeight
            loading={loading}
          />
        </div>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 4, maxWidth: '2000px', mx: 'auto', bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" mb={4}>
        {menuItems.map(item => (
          <Button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            variant={activePage === item.key ? 'contained' : 'outlined'}
            sx={{
              borderRadius: '30px',
              px: 3,
              py: 1.5,
              background: activePage === item.key ? item.color : 'transparent',
              color: activePage === item.key ? '#fff' : item.color,
              borderColor: item.color,
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: activePage === item.key ? 4 : 'none',
              '&:hover': {
                background: item.color,
                color: '#fff'
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Stack>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            fullWidth
            sx={{ maxWidth: 600 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        {/* Content */}
        {renderPage()}
      </Paper>
      {/* Message Dialog */}
      <Dialog 
        open={messageDialogOpen} 
        onClose={() => setMessageDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              {selectedMessage ? `${selectedMessage.fullName || selectedMessage.name}'s Details` : 'Message Details'}
            </Typography>
            <IconButton onClick={() => setMessageDialogOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedMessage && (
            <Box>
              <Typography variant="h6" gutterBottom>Message:</Typography>
              <Paper sx={{ p: 2, bgcolor: '#f5f5f5', mb: 2 }}>
                <Typography>{selectedMessage.message}</Typography>
              </Paper>
              <Typography variant="h6" gutterBottom>Contact Information:</Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {activePage === 'contactus' && <>
                  <Typography><strong>Full Name:</strong> {selectedMessage.fullName}</Typography>
                  <Typography><strong>Mobile Number:</strong> {selectedMessage.mobileNumber}</Typography>
                  <Typography><strong>Email:</strong> {selectedMessage.email}</Typography>
                  <Typography><strong>City:</strong> {selectedMessage.city}</Typography>
                  <Typography><strong>Image:</strong> {selectedMessage.imageUrl}</Typography>
                  <Typography><strong>Date:</strong> {selectedMessage.createdAt}</Typography>
                </>}
                {(activePage === 'jasmin' || activePage === 'jeddah') && <>
                  <Typography><strong>First Name:</strong> {selectedMessage.firstName}</Typography>
                  <Typography><strong>Last Name:</strong> {selectedMessage.lastName}</Typography>
                  <Typography><strong>Email:</strong> {selectedMessage.email}</Typography>
                  <Typography><strong>Address To:</strong> {selectedMessage.addressTo}</Typography>
                  <Typography><strong>Message:</strong> {selectedMessage.message}</Typography>
                </>}
                {activePage === 'franchise' && <>
                  <Typography><strong>Full Name:</strong> {selectedMessage.fullName}</Typography>
                  <Typography><strong>Surname:</strong> {selectedMessage.surname}</Typography>
                  <Typography><strong>Company Name:</strong> {selectedMessage.companyName}</Typography>
                  <Typography><strong>Mobile Number:</strong> {selectedMessage.mobileNumber}</Typography>
                  <Typography><strong>Email:</strong> {selectedMessage.email}</Typography>
                  <Typography><strong>City:</strong> {selectedMessage.city}</Typography>
                  <Typography><strong>Date of Birth:</strong> {selectedMessage.dob}</Typography>
                  <Typography><strong>Education Status:</strong> {selectedMessage.educationStatus}</Typography>
                  <Typography><strong>Province:</strong> {selectedMessage.province}</Typography>
                  <Typography><strong>How Did You Hear About Us:</strong> {selectedMessage.hearAboutUs}</Typography>
                  <Typography><strong>Promotional Consent:</strong> {selectedMessage.promotionalConsent}</Typography>
                  <Typography><strong>Personal Data Consent:</strong> {selectedMessage.personalDataConsent}</Typography>
                  <Typography><strong>Date:</strong> {selectedMessage.createdAt}</Typography>
                </>}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
