import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import DOMPurify from 'dompurify';

const EmailPreviewComponent = ({ previewHtml }) => {
  const sanitizedHtml = DOMPurify.sanitize(previewHtml);

  return (
    <Paper 
      sx={{ 
        paddingTop: '2%',
        margin: '5% 0%',
        paddingBottom: '2%',
        backgroundColor: '#F8FAFC', 
        boxShadow: 'none'
      }}
    >
      {/* <Box sx={{ borderBottom: '1px solid #efe9e9', display: 'flex', alignItems: 'center', padding: '0 1%' }}>
        <img src="/previewImg.png" style={{ height: '20px', marginRight: '8px' }} alt="preview" />
        <Typography variant="subtitle1">Preview Email</Typography>
      </Box> */}
      <Box sx={{ padding: '2%' }}>
        <Typography variant="body2" paragraph>
          Here's a preview of the email that was sent to the end user
        </Typography>
        <Box 
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }} 
          sx={{ 
            backgroundColor: 'white', 
            border: '1px solid #e0e0e0', 
            borderRadius: '4px', 
            padding: '16px',
            '& img': { maxWidth: '100%' }
          }}
        />
      </Box>
    </Paper>
  );
};

export default EmailPreviewComponent;