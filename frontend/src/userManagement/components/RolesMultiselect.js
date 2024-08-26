import React, { useEffect, useState } from "react";
import { Checkbox, Select, Tooltip } from "antd";

const { Option } = Select;

const RolesMultiselect = ({ options, handleComboBox, selectedOptions }) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const handleChange = (selected) => {
        setSelectedItems(selected);
    };

    const renderTooltip = () => (
        <Tooltip title={selectedItems.join(", ")}>
            {selectedItems[0] + "+ " + (selectedItems.length - 1)}
        </Tooltip>
    );

    useEffect(() => {
        if (selectedOptions && selectedOptions !== "") {
            setSelectedItems(selectedOptions.split(","));
        }
    }, [selectedOptions]);

    return (
        options &&
        options.length > 0 && (
            <Select
                mode="multiple"
                value={selectedItems}
                onChange={handleChange}
                maxTagCount={"responsive"}
                maxTagPlaceholder={renderTooltip}
                placeholder="Select options"
                style={{
                    width: "100%",
                    height: "30px",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
                dropdownRender={(menu) => (
                    <div>
                        <div
                            style={{
                                maxHeight: "200px",
                                overflow: "auto",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {options.map((option) => (
                                <Checkbox
                                    key={option.name}
                                    value={option.name}
                                    checked={selectedItems.includes(option.name)}
                                    onChange={() => {
                                        const newSelectedItems = [...selectedItems];
                                        if (newSelectedItems.includes(option.name)) {
                                            newSelectedItems.splice(newSelectedItems.indexOf(option.name), 1);
                                        } else {
                                            newSelectedItems.push(option.name);
                                        }
                                        setSelectedItems(newSelectedItems);
                                        const filteredArray = options.filter((item) =>
                                            newSelectedItems.includes(item.name)
                                        );

                                        handleComboBox(filteredArray);
                                    }}
                                >
                                    {option.name}
                                </Checkbox>
                            ))}
                        </div>
                    </div>
                )}
            >
                {options.map((option) => (
                    <Option key={option.name} value={option.name}>
                        {option.name}
                    </Option>
                ))}
            </Select>
        )
    );
};

export default RolesMultiselect;
