import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './modalComponent.css';
import { textConstants } from "../../../textConstants";
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const JsonViewerModal = ({ isOpen, onClose, jsonData, modalInfo, modalDesc, modalLink }) => {
  const [activeTab, setActiveTab] = useState(0); // Track the active tab

  if (!isOpen) return null;

  const infoConstant = textConstants[modalInfo]

  const descConstant = textConstants[modalDesc]

  const docLink = textConstants[modalLink]

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div className="modal-header-content">
            <div className="modal-title">{textConstants.SHARED_DATA_MODAL_TITLE}</div>
            <div className="modal-subtitle">{descConstant}</div>
          </div>
          <IconButton
            onClick={() => { setActiveTab(0); onClose(); }}
            className="close-button"
            size="large">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="modal-content">
          <div className="modal-tabs">
            {jsonData.map((tab, index) => (
              <div
                key={index}
                className={`modal-tab ${index === activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                {tab.JsonLabel}
              </div>
            ))}
          </div>
          <div className="json-viewer">
            <div className='modal-info-footer'>
              {infoConstant}<br></br>
              <span className='link'><a href={docLink} target='_blank'> Learn how to implement  </a> </span>
            </div>
            <ReactJson src={jsonData[activeTab].JsonData} theme="monokai" collapsed={false} />
          </div>
        </div>

        <div className="modal-footer">
          <Button variant="contained" color="primary" onClick={() => { setActiveTab(0); onClose(); }}>
            Got it
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JsonViewerModal;