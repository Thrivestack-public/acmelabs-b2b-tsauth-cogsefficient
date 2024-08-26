import React, { useEffect, useState } from "react";
import MemberSearch from "./components/MemberSearch";
import SelectItem from "./components/SelectItem";
import MemberList from "./widgets/MemberList";
import ConfirmForm from "./feautures/ConfirmForm";
import { Icon } from "@iconify/react";
import { Spin, Button as AntdButton, Select } from "antd";
import Button from "./components/Button";
import { Option } from "antd/es/mentions";
import { load } from "js-yaml";
import { Cookie } from "@mui/icons-material";

export default function MemberView() {
    const [sortByStatus, setSortByStatus] = useState("");
    const [sortByRole, setSortByRole] = useState("");
    const [searchText, setSearchText] = useState("");

    const [data, setData] = useState(null);
    const [roleData, setRoleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleSortByRole = (item) => {
        setSortByRole(item);
    };

    const clearFilters = () => {
        setSortByRole("");
        setSortByStatus("");
        setSearchText("");
    };

    useEffect(() => {
        let filters = [];

        filters.push({
            Key: "name",
            Operator: "contains",
            Value: searchText
        });

        if (sortByStatus !== "") {
            filters.push({
                Key: "status",
                Operator: "in",
                Value: sortByStatus
            });
        }

        if (sortByRole !== "") {
            filters.push({
                Key: "role",
                Operator: "in",
                Value: sortByRole
            });
        }
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`https://api.dev.app.thrivestack.ai/api/user/list`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        account_id: localStorage.getItem("productId"),
                        filters,
                        page_size: 10000,
                        page_no: 0
                    })
                });

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const result = await response.json();
                setData(result.users);
            } catch (error) {
                setData([]);
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchText, sortByStatus, sortByRole]);

    useEffect(() => {
        const fetchRoleData = async () => {
            try {
                const additionalResponse = await fetch(`https://api.dev.app.thrivestack.ai/api/user/roles`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        AccountId: localStorage.getItem("productId"),
                    })
                });

                if (!additionalResponse.ok) {
                    throw new Error("Network response was not ok");
                }
                const additionalResult = await additionalResponse.json();
                setRoleData(additionalResult);
            } catch (error) {
                console.error(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRoleData();
    }, []);

    const handleSortByStatus = (item) => {
        setSortByStatus(item);
    };

    const handleSearchText = (item) => {
        setSearchText(item);
    };

    const handleBlockOpened1 = (item, name) => {
        let user = data.find((item) => item.email_id === name);
        user.status = "Suspended";
        updateUserData(user);
    };

    const handleUnBlockOpened1 = (item, name) => {
        let user = data.find((item) => item.email_id === name);
        user.status = "Active";
    };

    const handleDeleteOpened1 = (item, name) => {
        let user = data.find((item) => item.email_id === name);
        user.status = "Deleted";
        updateUserData(user);
    };

    const roleChanged = (roleData) => {
        let user = data.find((item) => item.email_id === roleData.emailId);
        user.role = roleData.data;
        updateUserData(user);
    };

    const nameChanged = (userInfo) => {
        let user = data.find((item) => item.email_id === userInfo.emailId);
        user.name = userInfo.data;
        updateUserData(user);
    };

    const updateUserData = async (user) => {
        try {
            setLoading(true);
            const response = await fetch(`https://api.dev.app.thrivestack.ai/api/user/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("TSManagementToken")}`
                },
                body: JSON.stringify({
                    user_id: user.user_id,
                    Name: user.name,
                    Role: user.role,
                    Status: user.status
                })
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            if (result.status) {
                console.log("updated roles");
            } else {
                console.log("failed");
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", padding: "5rem", backgroundColor: "white", height: "100%", width: "100%" }}>
                <span style={{ color: "#0F172A" }}>Manage members and their roles</span>

                <div style={{ width: "calc(100% - 150px)", marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "2rem" }}>
                    <div style={{ width: "70%" }}>
                        <MemberSearch handleSearch={handleSearchText} />
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <Select placeholder="Status" onChange={handleSortByStatus} value={sortByRole || undefined}>
                            {[
                                { label: "Active" },
                                { label: "Suspended" },
                                { label: "Deleted" },
                                { label: "Invited" },
                                { label: "Invitation expired" }
                            ].map((option) => (
                                <Option key={option.label} value={option.label}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>

                        <Select placeholder="Roles" onChange={handleSortByRole} value={sortByRole || undefined}>
                            {[{ label: "viewer" }, { label: "admin" }, { label: "editor" }].map((option) => (
                                <Option key={option.label} value={option.label}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                        <AntdButton type="text" onClick={clearFilters} style={{ borderColor: "#1E61F0", color: "#1E61F0" }}>
                            Clear
                        </AntdButton>
                    </div>
                </div>

                <div style={{ width: "100%", marginTop: "1.75rem", height: "100%" }}>
                    <Spin spinning={loading} tip={"loading data..."}>
                        {data && data.length > 0 && roleData && !loading ? (
                            <MemberList
                                onRoleChanged={roleChanged}
                                initialMembers={data}
                                rolesData={roleData}
                                blockOpen1={handleBlockOpened1}
                                deleteOpen1={handleDeleteOpened1}
                                unblockOpen1={handleUnBlockOpened1}
                                onNameChanged={nameChanged}
                            />
                        ) : !loading ? (
                            <div>No records found</div>
                        ) : null}
                    </Spin>
                </div>
            </div>
        </div>
    );
}
