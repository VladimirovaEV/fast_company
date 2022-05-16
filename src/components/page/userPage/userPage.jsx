import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
// import { useHistory } from "react-router-dom";
// import QualitiesList from "./qualitiesList";
import Qualities from "../../ui/qualities";
// import Edit from "../../ui/edit";
import { Link } from "react-router-dom";

const UserPage = ({ userId }) => {
    // const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    // const handleReturn = () => {
    //     history.push("/users");
    // };
    return (
        <div className="container mt-5">
            {user && (
                <>
                    <h2>{user.name}</h2>
                    <h2>Профессия: {user.profession.name}</h2>
                    <div>
                        {/* <QualitiesList qualities={user.qualities}/> */}
                        <Qualities qualities={user.qualities}/>
                    </div>
                    <div>completedMeetings: {user.completedMeetings}</div>
                    <h3>Rate: {user.rate}</h3>
                    <Link to={`users/${user._id}/edit`}>
                        <button
                            // onClick = {() => {
                            //     handleReturn();
                            // }}
                        >
                            Изменить
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
