import React from "react";
import PropTypes from "prop-types";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/ui/editUserPage";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    return (
        userId ? (
            edit ? (
                <EditUserPage edit={edit}/>
            ) : (
                <UserPage userId={userId} />
            )
        ) : (
            <UsersListPage />
        )
    );
};

Users.propTypes = {
    // users: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number
};
export default Users;
