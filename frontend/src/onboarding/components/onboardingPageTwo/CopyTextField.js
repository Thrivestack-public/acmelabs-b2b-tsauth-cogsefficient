import React from 'react';
import { TextField, IconButton, InputAdornment, Box } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CopyTextField = ({ text }) => {
  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={text}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <CopyToClipboard text={text}>
                <IconButton edge="end">
                  <ContentCopy />
                </IconButton>
              </CopyToClipboard>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CopyTextField;
