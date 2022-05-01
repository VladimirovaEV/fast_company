import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api";
import { useHistory } from "react-router-dom";
import QualitiesList from "./qualitiesList";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    const handleReturn = () => {
        history.push("/users");
    };
    return (
        <div>
            {user && (
                <>
                    <h2>{user.name}</h2>
                    <h2>Профессия: {user.profession.name}</h2>
                    <div>
                        <QualitiesList qualities={user.qualities}/>
                    </div>
                    <div>completedMeetings: {user.completedMeetings}</div>
                    <h3>Rate: {user.rate}</h3>
                    <button
                        onClick = {() => {
                            handleReturn();
                        }}
                    >
                        Все пользователи
                    </button>
                </>
            )}
            {/* <h2>{user ? user.name : `Loading...`}</h2>; */}
            {/* <button
                onClick = {() => {
                    handleReturn();
                }}
            >
                Все пользователи
            </button> */}
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
