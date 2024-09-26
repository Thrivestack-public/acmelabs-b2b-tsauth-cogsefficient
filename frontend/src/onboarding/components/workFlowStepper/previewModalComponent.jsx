import React from 'react';
import './modalComponent.css';
import { Typography, Paper, Box, IconButton, Button } from '@mui/material';
import { textConstants } from '../../../textConstants';
import CloseIcon from '@mui/icons-material/Close';
import EmailPreviewComponent from '../../../emailPreview/component/EmailPreviewComponent';

function PreviewModalComponent({ isOpen, onClose, user }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal" style={{
        fontFamily: 'Satoshi',
        lineHeight: '18px',
        width: '80%',
        maxWidth: '800px',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #efe9e9' }}>
          {/* <h3 style={{ lineHeight: '32px', fontSize: '16px', fontWeight: 'bold', marginTop: 0 }}>
            {textConstants.PREV_MODAL_TITLE}
          </h3> */}
          <IconButton
            onClick={onClose}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            <CloseIcon />
          </IconButton>
          <Typography fontSize={'14px'} color={'#334155'}>
            {textConstants.PREV_MODAL_DESC}
          </Typography>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
          {/* <Paper sx={{ 
            backgroundColor: '#F8FAFC', 
            boxShadow: 'none',
            overflow: 'hidden'
          }}> */}
          {/* <Box sx={{ 
              borderBottom: '1px solid #efe9e9', 
              padding: '10px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <img src="/previewImg.png" style={{ height: '20px', marginRight: '10px' }} alt="preview" />
              <Typography>{textConstants.WORKFLOW_STEPPER_TITLE_TWO}</Typography>
            </Box> */}



          <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
            {user === "notify" ? (
              <Box sx={{ padding: '20px' }}>
                <EmailPreviewComponent previewHtml={textConstants.WELCOME_MAIL} />
              </Box>
            ) : (
              <Box sx={{ padding: '20px' }}>
                <EmailPreviewComponent previewHtml={textConstants.ENRICHMENT_MAIL} />
              </Box>
            )}
          </div>



          {/* </Paper> */}
        </div>

        <div style={{
          borderTop: '1px solid #efe9e9',
          padding: '20px',
          textAlign: 'right'
        }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div >
  );
}

export default PreviewModalComponent;