import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;

    const [users, setUsers] = useState();
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setValue("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const [value, setValue] = useState("");
    const handleChangeValue = (event) => setValue(event.target.value);
    if (users) {
        const searchUsers = users.filter(user => {
            return user.name.toLowerCase().includes(value.toLowerCase());
        });
        const filteredUsers = selectedProf
            ? users.filter(
                (user) =>
                    JSON.stringify(user.profession) ===
                    JSON.stringify(selectedProf)
            )
            : users;

        const count = filteredUsers.length;
        // const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        let sortedUsers;
        if (value) {
            sortedUsers = _.orderBy(searchUsers, [sortBy.path], [sortBy.order]);
        }
        if (!value) {
            sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
        }
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearFilter = () => {
            setSelectedProf();
        };
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem = {selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className = "btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {" "}
                            Очистить</button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    {
                        <>
                            <div className="container-fluid">
                                <form className="d-flex">
                                    <input
                                        className="form-control me-2"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        onChange={handleChangeValue}
                                        name="search"
                                    />
                                </form>
                            </div>
                        </>
                    }
                    {count > 0 && (
                        <UsersTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading";
};

export default UsersList;
