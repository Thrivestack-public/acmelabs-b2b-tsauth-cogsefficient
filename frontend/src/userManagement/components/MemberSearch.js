import React, { useEffect, useState } from "react";

export default function MemberSearch({ handleSearch }) {
    const [isFocused, setIsFocused] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        handleSearch(text);
    }, [text]);

    return (
        <div style={{ position: "relative", height: "fit-content", width: "100%" }}>
            <input
                style={{
                    backgroundColor: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    padding: "4px 12px",
                    paddingLeft: "44px",
                    borderRadius: "8px",
                    height: "32px",
                    outline: "none",
                    width: "100%",
                    minWidth: "120px",
                }}
                placeholder=" "
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    left: "20px",
                    pointerEvents: "none",
                }}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M5.93271 11.0124C4.50966 11.0124 3.30452 10.5189 2.31729 9.53177C1.33021 8.54455 0.83667 7.33941 0.83667 5.91635C0.83667 4.4933 1.33021 3.28816 2.31729 2.30094C3.30452 1.31385 4.50966 0.820312 5.93271 0.820312C7.35577 0.820312 8.56091 1.31385 9.54813 2.30094C10.5352 3.28816 11.0288 4.4933 11.0288 5.91635C11.0288 6.51149 10.9289 7.0799 10.7292 7.62156C10.5293 8.16323 10.2627 8.63434 9.92938 9.0349L14.7244 13.8299C14.8398 13.9452 14.8988 14.0902 14.9015 14.2649C14.9041 14.4396 14.8451 14.5873 14.7244 14.708C14.6037 14.8287 14.4573 14.8891 14.2852 14.8891C14.1133 14.8891 13.9669 14.8287 13.8463 14.708L9.05125 9.91302C8.63459 10.257 8.15542 10.5263 7.61375 10.7207C7.07209 10.9152 6.51174 11.0124 5.93271 11.0124ZM5.93271 9.7626C7.00646 9.7626 7.91591 9.38997 8.66104 8.64469C9.40632 7.89955 9.77896 6.9901 9.77896 5.91635C9.77896 4.8426 9.40632 3.93316 8.66104 3.18802C7.91591 2.44274 7.00646 2.0701 5.93271 2.0701C4.85896 2.0701 3.94952 2.44274 3.20438 3.18802C2.4591 3.93316 2.08646 4.8426 2.08646 5.91635C2.08646 6.9901 2.4591 7.89955 3.20438 8.64469C3.94952 9.38997 4.85896 9.7626 5.93271 9.7626Z"
                        fill="#94A3B8"
                    />
                </svg>
            </div>
            {!isFocused && text === "" ? (
                <span
                    style={{
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: "48px",
                        color: "#64748B",
                        pointerEvents: "none",
                    }}
                >
                    Search
                </span>
            ) : null}
        </div>
    );
}
