import React, { useState } from 'react';
import ReactJson from 'react-json-view';
import './modalComponent.css';
import { textConstants } from "../../../textConstants";
import { IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const JsonViewerModal = ({ isOpen, onClose, jsonData, modalInfo }) => {
  const [activeTab, setActiveTab] = useState(0); // Track the active tab

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
            <ReactJson src={jsonData[activeTab].JsonData} theme="monokai" collapsed={false} />
          </div>
        </div>

        <div className='modal-info-footer'>
          <div>
            {modalInfo ? (
              <>
                Tenant &gt; A webhook callback would be made to YourApp's backend.
                <span className='link'>  &lt;Learn more&gt;  </span>
                to configure and accept the requests.
              </>
            ) : (
              <>
                ThriveStack offers seamless APIs that can be easily integrated into your onboarding page to fetch enriched user and company data. The data is delivered in JSON format as shown.
              </>
            )}
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