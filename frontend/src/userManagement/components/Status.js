import React, { useState, useRef, useEffect } from "react";
import ConfirmForm from "../feautures/ConfirmForm";

const Colors = {
    Active: "#00A642",
    Blocked: "#D51818",
    Invited: "#DDDDDD",
    Deleted: "#F3934E"
};

const statusColors = {
    Active: Colors.Active,
    Blocked: Colors.Blocked,
    Invited: Colors.Invited,
    Deleted: Colors.Deleted
};

export default function Status({ email, status, invitationDate, blockOpen1, deleteOpen1, unblockOpen1, name }) {
    const color = statusColors[status] || "#DDDDDD";
    const [isHover, setIsHover] = useState(false);
    const [isOpened, setIsOpened] = useState(false);
    const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);

    const containerRef = useRef(null);

    const toggleOpen = () => setIsOpened((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpened(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <button
                style={{
                    width: "148px",
                    padding: "12px",
                    border: isHover || isOpened ? "1px solid #1238CE" : isHover ? "1px solid #E2E8F0" : "1px solid white",
                    borderRadius: "8px",
                    backgroundColor: "#F8FAFC",
                    textAlign: "start",
                    minWidth: "fit-content",
                    position: "relative",
                    cursor: "pointer",
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onClick={toggleOpen}>
                <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ backgroundColor: color, width: "8px", height: "8px", borderRadius: "50%" }}></div>
                    {status !== "Invited" && status !== "Invitation expired" ? (
                        <span style={{ color: "#0F172A", fontSize: "14px" }}>{status}</span>
                    ) : null}
                    {status === "Invited" || status === "Invitation expired" ? (
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ color: "#0F172A", fontSize: "14px" }}>{status}</span>
                            {!isHover && !isOpened && (
                                <span style={{ color: "#334155", fontSize: "10px" }}>{invitationDate}</span>
                            )}
                        </div>
                    ) : null}
                    {isHover || isOpened ? (
                        <div
                            style={{
                                position: "absolute",
                                right: "0",
                                transform: isOpened ? "rotate(180deg)" : "rotate(0deg)",
                            }}>
                            <svg
                                width="10"
                                height="6"
                                viewBox="0 0 10 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
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
                </div>
            </button>


            {isOpened && status === "Active" ? (
                <div
                    style={{
                        position: "absolute",
                        top: "55px",
                        minWidth: "178px",
                        zIndex: 2000,
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "1px solid #E2E8F0",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    }}>
                    <div
                        style={{
                            padding: "8px 16px",
                            borderBottom: "1px solid #E2E8F0",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                        onClick={() => {
                            setIsOpened(false);
                            deleteOpen1(true, email);
                        }}>
                        <div>
                            <svg
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.30775 17.4997C2.81058 17.4997 2.385 17.3227 2.031 16.9687C1.677 16.6147 1.5 16.1892 1.5 15.692V2.99973H1.25C1.0375 2.99973 0.859417 2.92782 0.71575 2.78398C0.571917 2.64015 0.5 2.46198 0.5 2.24948C0.5 2.03682 0.571917 1.85873 0.71575 1.71523C0.859417 1.57157 1.0375 1.49973 1.25 1.49973H5C5 1.2549 5.08625 1.04624 5.25875 0.873735C5.43108 0.701402 5.63967 0.615234 5.8845 0.615234H10.1155C10.3603 0.615234 10.5689 0.701402 10.7413 0.873735C10.9138 1.04624 11 1.2549 11 1.49973H14.75C14.9625 1.49973 15.1406 1.57165 15.2843 1.71548C15.4281 1.85932 15.5 2.03748 15.5 2.24998C15.5 2.46265 15.4281 2.64073 15.2843 2.78423C15.1406 2.9279 14.9625 2.99973 14.75 2.99973H14.5V15.692C14.5 16.1892 14.323 16.6147 13.969 16.9687C13.615 17.3227 13.1894 17.4997 12.6923 17.4997H3.30775ZM13 2.99973H3V15.692C3 15.7818 3.02883 15.8556 3.0865 15.9132C3.14417 15.9709 3.21792 15.9997 3.30775 15.9997H12.6923C12.7821 15.9997 12.8558 15.9709 12.9135 15.9132C12.9712 15.8556 13 15.7818 13 15.692V2.99973ZM6.15425 13.9997C6.36675 13.9997 6.54483 13.9279 6.6885 13.7842C6.832 13.6404 6.90375 13.4622 6.90375 13.2497V5.74973C6.90375 5.53723 6.83183 5.35907 6.688 5.21523C6.54433 5.07157 6.36617 4.99973 6.1535 4.99973C5.941 4.99973 5.76292 5.07157 5.61925 5.21523C5.47575 5.35907 5.404 5.53723 5.404 5.74973V13.2497C5.404 13.4622 5.47583 13.6404 5.6195 13.7842C5.76333 13.9279 5.94158 13.9997 6.15425 13.9997ZM9.8465 13.9997C10.059 13.9997 10.2371 13.9279 10.3807 13.7842C10.5243 13.6404 10.596 13.4622 10.596 13.2497V5.74973C10.596 5.53723 10.5242 5.35907 10.3805 5.21523C10.2367 5.07157 10.0584 4.99973 9.84575 4.99973C9.63325 4.99973 9.45517 5.07157 9.3115 5.21523C9.168 5.35907 9.09625 5.53723 9.09625 5.74973V13.2497C9.09625 13.4622 9.16817 13.6404 9.312 13.7842C9.45567 13.9279 9.63383 13.9997 9.8465 13.9997Z"
                                    fill="#64748B"
                                />
                            </svg>
                        </div>
                        <div style={{ color: "#64748B", fontSize: "16px" }}>Delete member</div>
                    </div>

                    <div
                        style={{
                            padding: "8px 16px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                        onClick={() => {
                            setIsOpened(false);
                            blockOpen1(true, email);
                        }}>
                        <div>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                                    fill="#64748B"
                                />
                            </svg>
                        </div>
                        <div style={{ color: "#64748B", fontSize: "16px" }}>Block member</div>
                    </div>
                </div>
            ) : null}


            {isOpened && status === "Blocked" ? (
                <div
                    style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}
                    className="absolute rounded-lg bg-white top-[55px] min-w-[178px] z-[2000] border border-[#E2E8F0]">
                    <div
                        className="py-2 px-4 border-b border-[#E2E8F0] cursor-pointer flex items-center gap-[10px] "
                        onClick={() => {
                            setIsOpened(false);
                            deleteOpen1(true, email);
                        }}>
                        <div>
                            <svg
                                width="16"
                                height="18"
                                viewBox="0 0 16 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M3.30775 17.4997C2.81058 17.4997 2.385 17.3227 2.031 16.9687C1.677 16.6147 1.5 16.1892 1.5 15.692V2.99973H1.25C1.0375 2.99973 0.859417 2.92782 0.71575 2.78398C0.571917 2.64015 0.5 2.46198 0.5 2.24948C0.5 2.03682 0.571917 1.85873 0.71575 1.71523C0.859417 1.57157 1.0375 1.49973 1.25 1.49973H5C5 1.2549 5.08625 1.04624 5.25875 0.873735C5.43108 0.701402 5.63967 0.615234 5.8845 0.615234H10.1155C10.3603 0.615234 10.5689 0.701402 10.7413 0.873735C10.9138 1.04624 11 1.2549 11 1.49973H14.75C14.9625 1.49973 15.1406 1.57165 15.2843 1.71548C15.4281 1.85932 15.5 2.03748 15.5 2.24998C15.5 2.46265 15.4281 2.64073 15.2843 2.78423C15.1406 2.9279 14.9625 2.99973 14.75 2.99973H14.5V15.692C14.5 16.1892 14.323 16.6147 13.969 16.9687C13.615 17.3227 13.1894 17.4997 12.6923 17.4997H3.30775ZM13 2.99973H3V15.692C3 15.7818 3.02883 15.8556 3.0865 15.9132C3.14417 15.9709 3.21792 15.9997 3.30775 15.9997H12.6923C12.7821 15.9997 12.8558 15.9709 12.9135 15.9132C12.9712 15.8556 13 15.7818 13 15.692V2.99973ZM6.15425 13.9997C6.36675 13.9997 6.54483 13.9279 6.6885 13.7842C6.832 13.6404 6.90375 13.4622 6.90375 13.2497V5.74973C6.90375 5.53723 6.83183 5.35907 6.688 5.21523C6.54433 5.07157 6.36617 4.99973 6.1535 4.99973C5.941 4.99973 5.76292 5.07157 5.61925 5.21523C5.47575 5.35907 5.404 5.53723 5.404 5.74973V13.2497C5.404 13.4622 5.47583 13.6404 5.6195 13.7842C5.76333 13.9279 5.94158 13.9997 6.15425 13.9997ZM9.8465 13.9997C10.059 13.9997 10.2371 13.9279 10.3807 13.7842C10.5243 13.6404 10.596 13.4622 10.596 13.2497V5.74973C10.596 5.53723 10.5242 5.35907 10.3805 5.21523C10.2367 5.07157 10.0584 4.99973 9.84575 4.99973C9.63325 4.99973 9.45517 5.07157 9.3115 5.21523C9.168 5.35907 9.09625 5.53723 9.09625 5.74973V13.2497C9.09625 13.4622 9.16817 13.6404 9.312 13.7842C9.45567 13.9279 9.63383 13.9997 9.8465 13.9997Z"
                                    fill="#64748B"
                                />
                            </svg>
                        </div>

                        <div className="text-deepGray text-lg ">Delete</div>
                    </div>

                    <div
                        className="py-2 px-4 cursor-pointer flex items-center gap-[10px] "
                        onClick={() => {
                            setIsOpened(false);
                            unblockOpen1(true, email);
                        }}>
                        <div>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.58075 14.2538L15.3038 7.53075L14.25 6.477L8.58075 12.1463L5.73075 9.29625L4.677 10.35L8.58075 14.2538ZM10.0017 19.5C8.68775 19.5 7.45267 19.2507 6.2965 18.752C5.14033 18.2533 4.13467 17.5766 3.2795 16.7218C2.42433 15.8669 1.74725 14.8617 1.24825 13.706C0.749417 12.5503 0.5 11.3156 0.5 10.0017C0.5 8.68775 0.749333 7.45267 1.248 6.2965C1.74667 5.14033 2.42342 4.13467 3.27825 3.2795C4.13308 2.42433 5.13833 1.74725 6.294 1.24825C7.44967 0.749417 8.68442 0.5 9.99825 0.5C11.3123 0.5 12.5473 0.749333 13.7035 1.248C14.8597 1.74667 15.8653 2.42342 16.7205 3.27825C17.5757 4.13308 18.2528 5.13833 18.7518 6.294C19.2506 7.44967 19.5 8.68442 19.5 9.99825C19.5 11.3123 19.2507 12.5473 18.752 13.7035C18.2533 14.8597 17.5766 15.8653 16.7218 16.7205C15.8669 17.5757 14.8617 18.2528 13.706 18.7518C12.5503 19.2506 11.3156 19.5 10.0017 19.5ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                                    fill="#64748B"
                                />
                            </svg>
                        </div>

                        <div className="text-deepGray text-lg ">Unblock</div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
