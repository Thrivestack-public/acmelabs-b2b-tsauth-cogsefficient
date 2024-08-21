import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './modalComponent.css';
import { textConstants } from "../../../textConstants";
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const JsonViewerModal = ({ isOpen, onClose, jsonData, tabLabel }) => {

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-title">{textConstants.SHARED_DATA_MODAL_TITLE}</div>
            <div className="modal-subtitle">{textConstants.SHARED_DATA_MODAL_DESC}</div>
          </div>
          <IconButton
            onClick={onClose}
            className="close-button"
            size="large">
            <CloseIcon />
          </IconButton>
        </div>
        <div className="modal-content">
          <div className="modal-tabs">
            <div
              className='modal-tab active'
            >
              {tabLabel}
            </div>
          </div>
          <div className="json-viewer">
            <ReactJson src={jsonData} theme="monokai" collapsed={false} />
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="contained" color="primary" onClick={onClose}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonViewerModal;
