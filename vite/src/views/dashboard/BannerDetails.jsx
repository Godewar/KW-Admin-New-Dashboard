import React from 'react';
import { useLocation } from 'react-router-dom';

const BannerDetails = () => {
  const location = useLocation();
  const image = location.state?.image;

  return (
    <div>
      <h2>Banner Details</h2>
      {image ? (
        <img src={image} alt="Banner" style={{ width: '100%', maxWidth: 600 }} />
      ) : (
        <p>No image provided.</p>
      )}
    </div>
  );
};

export default BannerDetails; 