import React, { useState } from "react";
import Status from "./Status";
import EditDetails from "../feautures/EditDetails";
import RolesMultiselect from "./RolesMultiselect";

export default function MemberItem({
    name,
    initials,
    email,
    rolesData,
    invitationDate,
    role,
    status,
    lastActive,
    memberSince,
    blockOpen1,
    deleteOpen1,
    unblockOpen1,
    roleChanged,
    nameChanged
}) {
    const [isNameHover, setIsNameHover] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);

    const close = () => {
        setIsEditOpen(false);
    };

    const handleComboBox = (data) => {
        roleChanged({ data, emailId: email });
    };

    const handleNameUpdate = (data) => {
        nameChanged({ data, emailId: email });
    };

    function convertToLocalDate(timeString) {
        const date = new Date(timeString);
        if (isNaN(date.getTime())) {
            return "-";
        }

        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffMinutes < 60) {
            return `${diffMinutes} mins ago`;
        }

        if (diffHours < 24) {
            return `${diffHours} hrs ago`;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${year}-${month}-${day} ${hours}:${minutes}`;
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #E7E7E7',
            position: 'relative'
        }}>
            <div
                style={{
                    width: '30%',
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    padding: '0.75rem 1.25rem',
                    gap: '0.75rem',
                    cursor: 'pointer',
                    ...(isNameHover ? { backgroundColor: '#F8FAFC' } : {}),
                }}
                onMouseEnter={() => setIsNameHover(true)}
                onMouseLeave={() => setIsNameHover(false)}>
                <div style={{
                    color: '#767676',
                    height: '36px',
                    width: '36px',
                    backgroundColor: '#F1F5F9',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid white',
                    cursor: 'pointer'
                }}>
                    {name.toUpperCase().split("")[0]}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{
                            color: '#0F172A',
                            fontSize: '14px',
                            pointerEvents: 'none'
                        }}>{name}</span>
                        {isNameHover ? (
                            <div style={{ cursor: 'pointer' }} onClick={() => setIsEditOpen(true)}>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.06535 11.6413C0.853465 11.6883 0.671021 11.6353 0.518021 11.4823C0.365021 11.3293 0.31202 11.1468 0.35902 10.9349L0.916687 8.25793L3.74235 11.0836L1.06535 11.6413ZM3.74235 11.0836L0.916687 8.25793L8.39619 0.778427C8.62608 0.548538 8.91069 0.433594 9.25002 0.433594C9.58935 0.433594 9.87397 0.548538 10.1039 0.778427L11.2219 1.89643C11.4517 2.12632 11.5667 2.41093 11.5667 2.75026C11.5667 3.08959 11.4517 3.37421 11.2219 3.60409L3.74235 11.0836ZM9.10902 1.48109L2.29235 8.29126L3.70902 9.70793L10.5192 2.89126C10.5576 2.85282 10.5769 2.80476 10.5769 2.74709C10.5769 2.68932 10.5576 2.64121 10.5192 2.60276L9.39752 1.48109C9.35908 1.44265 9.31097 1.42343 9.25319 1.42343C9.19552 1.42343 9.14747 1.44265 9.10902 1.48109Z"
                                        fill="#64748B"
                                    />
                                </svg>
                            </div>
                        ) : null}
                    </div>

                    <span style={{
                        color: '#334155',
                        fontSize: '12px',
                        pointerEvents: 'none',
                        fontFamily: 'sans-serif',
                        fontWeight: 600
                    }}>
                        {email}
                    </span>
                </div>
            </div>

            <div style={{ width: '10%' }}>
                <RolesMultiselect handleComboBox={handleComboBox} options={rolesData} selectedOptions={role} />
            </div>

            <div style={{ width: '20%', cursor: 'pointer' }}>
                <Status
                    email={email}
                    blockOpen1={blockOpen1}
                    deleteOpen1={deleteOpen1}
                    unblockOpen1={unblockOpen1}
                    invitationDate={invitationDate}
                    status={status}
                    name={name}
                />
            </div>

            <div style={{ padding: '0.75rem', width: '20%' }}>
                <span style={{
                    color: '#0F172A',
                    fontSize: '14px'
                }}>{convertToLocalDate(lastActive)}</span>
            </div>

            <div style={{ padding: '0.75rem', width: '20%' }}>
                <span style={{
                    color: '#0F172A',
                    fontSize: '14px'
                }}>{convertToLocalDate(memberSince)}</span>
            </div>

            {isEditOpen ? <EditDetails name={name} email={email} close={close} updateName={handleNameUpdate} /> : null}
        </div>
    );
}
