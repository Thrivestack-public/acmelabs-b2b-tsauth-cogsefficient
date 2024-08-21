import React from 'react';
import './modalComponent.css';
import { Typography, Paper, Box, IconButton, Button } from '@mui/material';
import { textConstants } from '../../../textConstants';
import CloseIcon from '@mui/icons-material/Close';

function PreviewModalComponent({ isOpen, onClose }) {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal" style={{ paddingLeft: '2%', paddingRight:'2%', fontFamily: 'Satoshi', lineHeight: '18px' , height:'65%', borderBottom: '1px solid #efe9e9' }}>
        <h3 style={{ lineHeight: '32px', fontSize: '16px', fontWeight: 'bold' }}>{textConstants.PREV_MODAL_TITLE}</h3>
        <IconButton onClick={onClose} className="close-button" style={{ position: 'absolute', top: '10px', right: '10px' }}>
          <CloseIcon />
        </IconButton>
        <Typography fontSize={'14px'} color={'#334155'}>
          {textConstants.PREV_MODAL_DESC}
        </Typography>
        <Paper sx={{ paddingTop: '2%',
         margin: '5% 0%',
          paddingBottom: '2%',
           backgroundColor: '#F8FAFC', boxShadow:'none'}}>
          <Box style={{ borderBottom: '1px solid #efe9e9' }}>
            <img src="/previewImg.png" style={{ height: '20px', padding: '0% 1%', marginTop: '-1%' }} alt="preview" /> {textConstants.WORKFLOW_STEPPER_TITLE_TWO}
          </Box><br />
          <Box style={{ paddingLeft: '2%' }}>
            {textConstants.PREV_MODAL_TEXT} <br />
            <br />
            {textConstants.PREV_MODAL_TEXT1}
            <br />
            <br />
            {textConstants.PREV_MODAL_TEXT2}
          </Box>
        </Paper>
        <div className="modal-footer" style={{ textAlign: 'right' }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PreviewModalComponent;
