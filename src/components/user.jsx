import React from 'react';
import { getQualClasses } from './qualitie';
import BookMark from './bookmark';

const User = (props) => {
    const { user } = props;
    
        return (
            <tr key = {user._id}> 
            <td>{user.name}</td>
            <td>
                {(user.qualities).map((item) => {
                        return <span key = {item._id}
                        className = {getQualClasses(item.color)}>
                            {item.name} </span>
                })}    
                </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td>
                <BookMark />
            </td>
            <td>
                <button className="btn btn-danger"
                 onClick={() => props.onDelete(user)}  >
                delete
                </button>
            </td>
            </tr>
        )

};

export default User;