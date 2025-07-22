import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/leads');
        const data = await res.json();
        // If you want only appointments, filter here. If all, remove filter.
        const filtered = Array.isArray(data) ? data.filter(lead => lead.formType === 'book-appoitnment') : [];
        setAppointments(filtered);
      } catch (err) {
        setError('Failed to fetch appointment data');
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto', bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
        Appointment Data
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Agent Name</TableCell>
                  <TableCell>Your Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Purpose</TableCell>
                  <TableCell>Terms Accepted</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center">No appointments found.</TableCell>
                  </TableRow>
                ) : appointments.map((item, idx) => (
                  <TableRow key={item._id || idx}>
                    <TableCell>{item.agentName || '-'}</TableCell>
                    <TableCell>{item.yourName || '-'}</TableCell>
                    <TableCell>{item.phone || '-'}</TableCell>
                    <TableCell>{item.email || '-'}</TableCell>
                    <TableCell>{item.city || '-'}</TableCell>
                    <TableCell>{item.purpose || '-'}</TableCell>
                    <TableCell>{item.termsAccepted ? 'Yes' : 'No'}</TableCell>
                    <TableCell>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
};

export default Appointment; 