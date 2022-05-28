import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../../../api";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return (
        <div className="container">
            <div className="row gutters-sm">
                {user && (
                    <>
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
