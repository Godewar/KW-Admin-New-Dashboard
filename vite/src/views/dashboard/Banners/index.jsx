'use client';
import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, Outlet } from 'react-router-dom';

const sections = [
  { title: 'Home Page', image: 'https://static.wixstatic.com/media/36a881_2f8058ab9458489d809789180a93e9c4~mv2.jpg/v1/fill/w_764,h_659,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/1.jpg' },
  { title: 'Properties', image: 'https://static.wixstatic.com/media/36a881_a9d2f8da75974d2e93c73710dcf31d91~mv2.jpg/v1/fill/w_789,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/2.jpg' },
  { title: 'Active Properties', image: 'https://via.placeholder.com/300x100?text=activeproperties' },
  { title: 'Sold Properties', image: 'https://via.placeholder.com/300x100?text=soldproperties' },
  { title: 'Rent Properties', image: 'https://via.placeholder.com/300x100?text=rentproperties' },
  { title: 'Auction Properties', image: 'https://via.placeholder.com/300x100?text=auctionproperties' },
  { title: 'New Development Properties', image: 'https://via.placeholder.com/300x100?text=newdevelopmentproperties' },
  { title: 'Market Center', image: 'https://via.placeholder.com/300x100?text=marketcenter' },
  { title: 'Agent', image: 'https://via.placeholder.com/300x100?text=Agent' },
  { title: 'Seller', image: 'https://via.placeholder.com/300x100?text=Seller' },
  { title: 'Buyer', image: 'https://via.placeholder.com/300x100?text=Buyer' },
  { title: 'Tenant', image: 'https://via.placeholder.com/300x100?text=tenant' },
  { title: 'Franchise', image: 'https://via.placeholder.com/300x100?text=franchise' },
  { title: 'Our Culture', image: 'https://via.placeholder.com/300x100?text=ourculture' },
  { title: 'Seller Guide', image: 'https://via.placeholder.com/300x100?text=sellerguide' },
  { title: 'Buyer Guide', image: 'https://via.placeholder.com/300x100?text=buyerguide' },
  { title: 'Tenant Guide', image: 'https://via.placeholder.com/300x100?text=tenantguide' },
  { title: 'KW Training', image: 'https://via.placeholder.com/300x100?text=kwtraining' },
  { title: 'Jasmin', image: 'https://via.placeholder.com/300x100?text=jasmin' },
  { title: 'Jeddah', image: 'https://via.placeholder.com/300x100?text=jeddah' },
  { title: 'Five Steps To Sell', image: 'https://via.placeholder.com/300x100?text=fivestepstosell' },
  { title: 'About Us', image: 'https://via.placeholder.com/300x100?text=About+Us' },
  { title: 'Contact Us', image: 'https://via.placeholder.com/300x100?text=contactus' },
  { title: 'Join Us', image: 'https://via.placeholder.com/300x100?text=joinus' },
  { title: 'Instant Valuation', image: 'https://via.placeholder.com/300x100?text=instantvaluation' },
  { title: 'Why KW', image: 'https://via.placeholder.com/300x100?text=whykw' },
  { title: 'KW Technology', image: 'https://via.placeholder.com/300x100?text=kwtechnology' },
  { title: 'KW University', image: 'https://via.placeholder.com/300x100?text=kwuniversity' },
  { title: 'Events', image: 'https://via.placeholder.com/300x100?text=events' },
  { title: 'News', image: 'https://via.placeholder.com/300x100?text=news' },
];

const BannerSectionPreview = () => {
  const navigate = useNavigate();

  const handleNavigate = (image) => {
    navigate('/banners/bannerdetails', { state: { image } });
  };

  return (
    <>
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          📋 Banner Section List
        </Typography>
        <List>
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <Avatar
                  src={section.image}
                  variant="rounded"
                  sx={{ width: 200, height: 100, mr: 2 }}
                />
                <ListItemText
                  primary={section.title}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleNavigate(section.image)}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              {index < sections.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Box>
      <Outlet />
    </>
  );
};

export default BannerSectionPreview;
