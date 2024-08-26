import React, { useState, useEffect, useRef } from "react";
import { roles } from "../data/Roles";
import { statuses } from "../data/Statuses";

export default function Select({ selectText, handleChoosenRole, handleChoosenStatus }) {
    const [isOpened, setIsOpened] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");
    const containerRef = useRef(null);
    const spanRef = useRef(null);
    const [inputWidth, setInputWidth] = useState(82);

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setIsOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (spanRef.current) {
            const width = spanRef.current.offsetWidth + 40;
            setInputWidth(Math.max(width, 82));
        }
    }, [selectedValue, selectText]);

    return (
        <div ref={containerRef} style={{ position: "relative", cursor: "pointer", display: "flex", flexDirection: "column" }}>
            <div
                style={{
                    position: "relative",
                    backgroundColor: isOpened ? "#F8FAFC" : "white",
                    border: isOpened ? "1px solid #1238CE" : "1px solid #E2E8F0",
                    height: "32px",
                    borderRadius: "6px",
                    display: "inline-flex",
                    alignItems: "center",
                    minWidth: inputWidth
                }}
                onClick={() => setIsOpened(!isOpened)}>
                <div
                    style={{
                        position: "absolute",
                        color: isOpened ? "#0F172A" : "#334155",
                        left: "12px",
                        top: "6px",
                        pointerEvents: "none"
                    }}>
                    {selectedValue === "" ? selectText : selectedValue}
                </div>
                <div
                    style={{
                        position: "absolute",
                        right: "16px",
                        top: "14px",
                        pointerEvents: "none",
                        transform: isOpened ? "rotate(180deg)" : "rotate(0deg)"
                    }}>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1.66667 1.33398L5 4.66732L8.33334 1.33398"
                            stroke="#64748B"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <span ref={spanRef} style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap", pointerEvents: "none" }}>
                {selectedValue === "" ? selectText : selectedValue}
            </span>

            {isOpened && selectText === "Role" ? (
                <div
                    style={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        position: "absolute",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        top: "45px",
                        minWidth: "178px",
                        zIndex: 2000
                    }}>
                    {roles.map((item) => (
                        <div
                            key={item.label}
                            style={{
                                padding: "8px 16px",
                                color: "#94A3B8",
                                borderBottom: "1px solid #E2E8F0",
                                fontSize: "18px"
                            }}
                            onClick={() => {
                                handleChoosenRole && handleChoosenRole(item.label);
                                setSelectedValue(item.label);
                                setIsOpened(false);
                            }}>
                            {item.label}
                        </div>
                    ))}
                </div>
            ) : null}

            {isOpened && selectText === "Status" ? (
                <div
                    style={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        position: "absolute",
                        borderRadius: "8px",
                        backgroundColor: "white",
                        top: "45px",
                        minWidth: "178px",
                        zIndex: 2000
                    }}>
                    {statuses.map((item) => (
                        <div
                            key={item.label}
                            style={{
                                padding: "8px 16px",
                                color: "#94A3B8",
                                borderBottom: "1px solid #E2E8F0",
                                fontSize: "18px"
                            }}
                            onClick={() => {
                                handleChoosenStatus && handleChoosenStatus(item.label);
                                setSelectedValue(item.label);
                                setIsOpened(false);
                            }}>
                            {item.label}
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
}
