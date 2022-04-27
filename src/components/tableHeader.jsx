import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };
    const renderIcon = (path) => {
        if (selectedSort.path === path) {
            const addClassName = () => {
                if (selectedSort.order === "asc") {
                    return (
                        "bi-caret-up-fill"
                    );
                } else if (selectedSort.order === "desc") {
                    return (
                        "bi-caret-down-fill"
                    );
                }
            };
            return (
                <span>
                    <i className={"bi " + addClassName()}></i>
                </span>
            );
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {columns[column].path && (
                            renderIcon(columns[column].path)
                        )}
                        {/* {renderIcon(columns[column].path)} */}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
