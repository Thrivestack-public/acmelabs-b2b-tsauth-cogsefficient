import React, { useState, useRef } from "react";

export default function Role({ role, rolesData }) {
    const [isHover, setIsHover] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [newValue, setNewValue] = useState("");
    const menuRef = useRef(null);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpened(false);
        }
    };

    React.useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div
            style={{
                position: "relative",
                cursor: "pointer",
                height: "36px",
                display: "flex",
                alignItems: "center",
            }}
        >
            <button
                style={{
                    width: "102px",
                    padding: "12px",
                    border: isOpened
                        ? "1px solid #1238CE"
                        : isHover
                            ? "1px solid #E2E8F0"
                            : "1px solid white",
                    borderRadius: "8px",
                    backgroundColor: "#F8FAFC",
                    textAlign: "left",
                    position: "relative",
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={() => setIsOpened((prev) => !prev)}
            >
                <span style={{ color: "#0F172A", fontSize: "14px" }}>
                    {newValue === "" ? role : newValue}
                </span>
                {isHover || isOpened ? (
                    <div
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "20px",
                            transform: isOpened ? "rotate(180deg)" : "none",
                        }}
                    >
                        <svg
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M1.66667 1.33398L5 4.66732L8.33334 1.33398"
                                stroke="#64748B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                ) : null}
            </button>
            {isOpened && (
                <div
                    ref={menuRef}
                    style={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                        position: "absolute",
                        top: "55px",
                        minWidth: "178px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        zIndex: 2000,
                    }}
                >
                    {rolesData.map((item) => (
                        <div
                            key={item.label}
                            style={{
                                padding: "8px 16px",
                                color: "#64748B",
                                borderBottom: "1px solid #E2E8F0",
                                fontSize: "18px",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                setNewValue(item.label);
                                setIsOpened(false);
                            }}
                        >
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
