import React, { useEffect, useState } from "react";
import { compareAsc, compareDesc } from "date-fns";
import MemberItem from "../components/MemberItem";

const parseDate = (dateString) => {
    const now = new Date();
    const dateParts = dateString.split(", ");

    if (dateParts.length === 2) {
        const [datePart, timePart] = dateParts;
        let [hours, minutes] = timePart.replace(/am|pm/, "").split(":").map(Number);
        const isPM = timePart.toLowerCase().includes("pm");

        let date = new Date();

        if (isPM && hours < 12) hours += 12;
        if (!isPM && hours === 12) hours = 0;

        if (datePart === "Today") {
            date.setHours(hours, minutes);
        } else if (datePart === "Yesterday") {
            date.setDate(now.getDate() - 1);
            date.setHours(hours, minutes);
        } else {
            return new Date(dateString);
        }

        return date;
    } else {
        return new Date(dateString);
    }
};

const compareValues = (a, b, direction) => {
    if (a === "-" && b !== "-") return 1;
    if (b === "-" && a !== "-") return -1;

    if (a instanceof Date && b instanceof Date) {
        return direction === "asc" ? compareAsc(a, b) : compareDesc(a, b);
    } else if (typeof a === "string" && typeof b === "string") {
        a = a.toLowerCase();
        b = b.toLowerCase();
        return direction === "desc" ? (b < a ? -1 : b > a ? 1 : 0) : a < b ? -1 : a > b ? 1 : 0;
    }
    return 0;
};

export default function MemberList({
    initialMembers,
    rolesData,
    blockOpen1,
    deleteOpen1,
    unblockOpen1,
    onRoleChanged,
    onNameChanged
}) {
    const [sortedMembers, setSortedMembers] = useState(initialMembers);
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "desc" });

    useEffect(() => {
        setSortedMembers(initialMembers);
    }, [initialMembers]);

    const roleChanged = (data) => {
        onRoleChanged(data);
    };

    const nameChanged = (data) => {
        onNameChanged(data);
    };

    return (
        <div
            style={{
                flexDirection: "column",
                border: "1px solid #E2E8F0",
                borderRadius: "0.5rem",
                paddingBottom: "0.25rem",
                height: "fit-content",
                ...(sortedMembers.length === 0 ? { backgroundColor: "#F8FAFB" } : {}),
            }}
        >
            <div style={{ width: "100%", height: "fit-content", display: "flex", alignItems: "center" }}>
                <div style={{
                    borderTopLeftRadius: "0.5rem",
                    backgroundColor: "#F8FAFB",
                    width: "30%",
                    height: "44px",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "1rem",
                        gap: "0.75rem"
                    }}>
                        <span style={{ fontSize: "0.875rem" }}>Name and email</span>
                        <div style={{ cursor: "pointer" }}>
                            <svg
                                width="8"
                                height="12"
                                viewBox="0 0 8 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.71561 0.776623C3.86453 0.628768 4.10499 0.629203 4.25338 0.777594L7.301 3.82521C7.44977 3.97398 7.44977 4.21519 7.301 4.36396C7.15223 4.51273 6.91102 4.51273 6.76225 4.36396L4.36496 1.96667V10.9517C4.36496 11.1621 4.1944 11.3327 3.98401 11.3327C3.77361 11.3327 3.60305 11.1621 3.60305 10.9517V1.96199L1.18269 4.36493C1.03338 4.51316 0.792181 4.51229 0.643948 4.36299C0.495715 4.21368 0.496586 3.97247 0.645894 3.82424L3.71561 0.776623Z"
                                    fill="#64748B"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div style={{
                    backgroundColor: "#F8FAFB",
                    width: "10%",
                    padding: "0.75rem",
                    height: "44px"
                }}>
                    <span style={{ fontSize: "0.875rem" }}>Role</span>
                </div>

                <div style={{
                    backgroundColor: "#F8FAFB",
                    width: "20%",
                    padding: "0.75rem",
                    height: "44px"
                }}>
                    <span style={{ fontSize: "0.875rem" }}>Status</span>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem",
                    gap: "0.75rem",
                    width: "20%",
                    backgroundColor: "#F8FAFB",
                    height: "44px"
                }}>
                    <span style={{ fontSize: "0.875rem" }}>Last active</span>
                    <div style={{ cursor: "pointer" }}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.71561 0.776623C3.86453 0.628768 4.10499 0.629203 4.25338 0.777594L7.301 3.82521C7.44977 3.97398 7.44977 4.21519 7.301 4.36396C7.15223 4.51273 6.91102 4.51273 6.76225 4.36396L4.36496 1.96667V10.9517C4.36496 11.1621 4.1944 11.3327 3.98401 11.3327C3.77361 11.3327 3.60305 11.1621 3.60305 10.9517V1.96199L1.18269 4.36493C1.03338 4.51316 0.792181 4.51229 0.643948 4.36299C0.495715 4.21368 0.496586 3.97247 0.645894 3.82424L3.71561 0.776623Z"
                                fill="#64748B"
                            />
                        </svg>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0.75rem",
                    gap: "0.75rem",
                    width: "20%",
                    backgroundColor: "#F8FAFB",
                    height: "44px",
                    borderTopRightRadius: "0.5rem"
                }}>
                    <span style={{ fontSize: "0.875rem" }}>Member since</span>
                    <div style={{ cursor: "pointer" }}>
                        <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M3.71561 0.776623C3.86453 0.628768 4.10499 0.629203 4.25338 0.777594L7.301 3.82521C7.44977 3.97398 7.44977 4.21519 7.301 4.36396C7.15223 4.51273 6.91102 4.51273 6.76225 4.36396L4.36496 1.96667V10.9517C4.36496 11.1621 4.1944 11.3327 3.98401 11.3327C3.77361 11.3327 3.60305 11.1621 3.60305 10.9517V1.96199L1.18269 4.36493C1.03338 4.51316 0.792181 4.51229 0.643948 4.36299C0.495715 4.21368 0.496586 3.97247 0.645894 3.82424L3.71561 0.776623Z"
                                fill="#64748B"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {sortedMembers.map((item, index) => (
                <MemberItem
                    key={index}
                    name={item.name}
                    email={item.email_id}
                    rolesData={rolesData.roles}
                    role={item.role.map((roleItem) => roleItem.name).join(",")}
                    status={item.status}
                    lastActive={item.last_active_at}
                    memberSince={item.member_since}
                    invitationDate={item.invitationDate}
                    initials={item.initials}
                    blockOpen1={blockOpen1}
                    deleteOpen1={deleteOpen1}
                    unblockOpen1={unblockOpen1}
                    roleChanged={roleChanged}
                    nameChanged={nameChanged}
                />
            ))}
        </div>
    );
}
