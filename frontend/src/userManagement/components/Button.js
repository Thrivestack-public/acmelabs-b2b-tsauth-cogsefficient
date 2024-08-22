import React from "react";

export default function Button({ text, cancel, onClick }) {
    return (
        <button
            onClick={() => onClick && onClick()}
            style={{
                padding: '10px 24px',
                borderRadius: '8px',
                backgroundColor: cancel ? 'white' : '#1E61F0',
                color: cancel ? '#1E61F0' : '#FFFFFF',
                border: cancel ? '1px solid #1E61F0' : 'none',
                cursor: 'pointer',
            }}
        >
            {text}
        </button>
    );
}
