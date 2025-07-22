import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from '@mui/material';

const JoinUs = () => {
  const [joinUsData, setJoinUsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoinUs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('http://localhost:5000/api/leads');
        const data = await res.json();
        const filtered = Array.isArray(data) ? data.filter(lead => lead.formType === 'join-us') : [];
        setJoinUsData(filtered);
      } catch (err) {
        setError('Failed to fetch join us data');
      } finally {
        setLoading(false);
      }
    };
    fetchJoinUs();
  }, []);

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', mx: 'auto', bgcolor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight="bold" mb={2} color="text.primary">
        Join Us Data
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
                  <TableCell>Full Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {joinUsData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No join us data found.</TableCell>
                  </TableRow>
                ) : joinUsData.map((item, idx) => (
                  <TableRow key={item._id || idx}>
                    <TableCell>{item.fullName || '-'}</TableCell>
                    <TableCell>{item.mobileNumber || '-'}</TableCell>
                    <TableCell>{item.email || '-'}</TableCell>
                    <TableCell>{item.city || '-'}</TableCell>
                    <TableCell>{item.message || '-'}</TableCell>
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

export default JoinUs; 