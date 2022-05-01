import React from "react";
import PropTypes from "prop-types";
import UserPage from "./userPage";
import UsersList from "./usersList";
import { useParams } from "react-router-dom";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <>
            {userId ? <UserPage userId={userId} /> : <UsersList />}
        </>
    );
};

Users.propTypes = {
    // users: PropTypes.arrayOf(PropTypes.object).isRequired,
    count: PropTypes.number
};
export default Users;
