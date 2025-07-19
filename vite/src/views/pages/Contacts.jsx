import React, { useState } from 'react';
import { Box, Stack, Button, Paper, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

export default function Contacts() {
  const [activePage, setActivePage] = useState('contactus');
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const columnsByTab = {
    contactus: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "city", headerName: "City", width: 150 },
      { field: "image", headerName: "Image", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '120px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View Message
          </Button>
        )
      },
    ],
    jasmin: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "surname", headerName: "Surname", width: 150 },
      // { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "address", headerName: "Address", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '120px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View Message
          </Button>
        )
      },
    ],
    jeddah: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "surname", headerName: "Surname", width: 150 },
      // { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "address", headerName: "Address", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '120px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View Message
          </Button>
        )
      },
    ],
    franchise: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "surname", headerName: "Surname", width: 150 },
      { field: "company", headerName: "Company Name", width: 150 },
      { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
      { field: "educationstatus", headerName: "Education Status", width: 180 },
      { field: "provinceyouwanttoapply", headerName: "Province You Want to Apply", width: 250 },
      { field: "howdidyouhearaboutthekellerwilliamsbrand", headerName: "How Did You Hear About the Keller Williams Brand", width: 380 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '120px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View Details
          </Button>
        )
      },
    ],
    joinus: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "city", headerName: "City", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
        renderCell: (params) => (
          <Button
            variant="outlined"
            size="small"
            sx={{ minWidth: '120px', whiteSpace: 'nowrap' }}
            onClick={() => {
              setSelectedMessage(params.row);
              setMessageDialogOpen(true);
            }}
          >
            View Message
          </Button>
        )
      },
    ],
    valuation: [
      { field: "id", headerName: "ID", width: 70 },
      { field: "date", headerName: "Date", width: 120 },
      { field: "name", headerName: "Name", width: 150 },
      { field: "mobile", headerName: "Mobile no.", width: 150 },
      { field: "email", headerName: "Email", width: 150 },
      { field: "city", headerName: "City", width: 150 },
      { field: "message", headerName: "Message", width: 200 },
      { 
        field: "actions", 
        headerName: "Actions", 
        width: 150,
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
            View Message
          </Button>
        )
      },
    ],
  };

  const dataByTab = {
    contactus: [
      { id: 1, date: "2024-01-15", name: "John Doe", mobile: "1234567890", email: "john@example.com", city: "New York",image:'-', message: "Hello!" },
      { id: 2, date: "2024-01-16", name: "Jane Smith", mobile: "2345678901", email: "jane@example.com", city: "Los Angeles",image:'-', message: "Need help." },
    ],
    jasmin: [
      { id: 1, date: "2024-01-10", name: "Ali", surname: "Jasmin", mobile: "3456789012", email: "ali@jasmin.com", address: "-", message: "Interested in franchise." },
      { id: 2, date: "2024-01-12", name: "Fatima", surname: "Noor", mobile: "9876543210", email: "fatima@jasmin.com", address: "-", message: "Looking for partnership." },
    ],
    jeddah: [
      { id: 1, date: "2024-01-08", name: "Ali", surname: "Jasmin", mobile: "3456789012", email: "ali@jasmin.com", address: "-", message: "Interested in franchise." },
      { id: 2, date: "2024-01-14", name: "Fatima", surname: "Noor", mobile: "9876543210", email: "fatima@jasmin.com", address: "-", message: "Looking for partnership." },
    ],
    franchise: [
      { 
        id: 1, 
        date: "2024-01-05",
        name: "Franchise Owner", 
        surname: "Jasmin", 
        company: "KW Real Estate", 
        mobile: "966501234567", 
        dateOfBirth: "1985-03-15", 
        educationstatus: "Bachelor's Degree", 
        provinceyouwanttoapply: "Riyadh Province", 
        howdidyouhearaboutthekellerwilliamsbrand: "Online Advertisement"
      },
      { 
        id: 2, 
        date: "2024-01-18",
        name: "New Franchise", 
        surname: "Al-Rashid", 
        company: "Property Solutions", 
        mobile: "966507654321", 
        dateOfBirth: "1990-07-22", 
        educationstatus: "Master's Degree", 
        provinceyouwanttoapply: "Eastern Province", 
        howdidyouhearaboutthekellerwilliamsbrand: "Referral from Existing Franchise"
      },
    ],
          joinus: [
        { id: 1, date: "2024-01-20", name: "Applicant JoinUs", mobile: "3456789012", email: "applicant@joinus.com", city: "Dammam", message: "Looking for job." },
        { id: 2, date: "2024-01-22", name: "Job Seeker", mobile: "3456789012", email: "job@joinus.com", city: "Riyadh",  message: "Resume attached." },
      ],
      valuation: [
        { id: 1, date: "2024-01-25", name: "Property Valuer", mobile: "966501234567", email: "valuer@property.com", city: "Mecca", message: "Requesting property valuation." },
        { id: 2, date: "2024-01-28", name: "Home Owner", mobile: "966507654321", email: "owner@home.com", city: "Jeddah", message: "Need quick property estimate." },
      ],
  };

  const menuItems = [
    { key: 'jasmin', label: 'Jasmin', color: '#e91e63' },
    { key: 'jeddah', label: 'Jeddah', color: '#2196f3' },
    { key: 'franchise', label: 'Franchise', color: '#00bcd4' },
    { key: 'contactus', label: 'Contact Us', color: '#4caf50' },
    { key: 'joinus', label: 'Join Us', color: '#ff9800' },
    { key: 'valuation', label: 'Instant Valuation', color: '#9c27b0' }
  ];

  const renderPage = () => {
    let rows = dataByTab[activePage] || [];
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
              {selectedMessage ? `${selectedMessage.name}'s Details` : 'Message Details'}
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
                <Typography><strong>Name:</strong> {selectedMessage.name}</Typography>
                {selectedMessage.surname && <Typography><strong>Surname:</strong> {selectedMessage.surname}</Typography>}
                {selectedMessage.mobile && <Typography><strong>Mobile:</strong> {selectedMessage.mobile}</Typography>}
                {selectedMessage.email && <Typography><strong>Email:</strong> {selectedMessage.email}</Typography>}
                {selectedMessage.city && <Typography><strong>City:</strong> {selectedMessage.city}</Typography>}
                {selectedMessage.address && <Typography><strong>Address:</strong> {selectedMessage.address}</Typography>}
                {selectedMessage.company && <Typography><strong>Company:</strong> {selectedMessage.company}</Typography>}
                {selectedMessage.dateOfBirth && <Typography><strong>Date of Birth:</strong> {selectedMessage.dateOfBirth}</Typography>}
                {selectedMessage.educationstatus && <Typography><strong>Education Status:</strong> {selectedMessage.educationstatus}</Typography>}
                {selectedMessage.provinceyouwanttoapply && <Typography><strong>Province:</strong> {selectedMessage.provinceyouwanttoapply}</Typography>}
                {selectedMessage.howdidyouhearaboutthekellerwilliamsbrand && <Typography><strong>How did you hear:</strong> {selectedMessage.howdidyouhearaboutthekellerwilliamsbrand}</Typography>}
                <Typography><strong>Date:</strong> {selectedMessage.date}</Typography>
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
