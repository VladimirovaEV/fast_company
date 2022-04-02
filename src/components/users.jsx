import React, { useState } from 'react';
import api from '../api';
import {SearchStatus} from './searchStatus';
import User from './user';

const Users = () => {
    // const [users, setUsers] = useState(api.users.fetchAll());
    // const handleDelete = (userId) => {
    //     setUsers((prevState) => prevState.filter((user) => user !== userId));
    // }
    
    // return (
    //     <>
    //     <SearchStatus usersCount={users.length}/>
    //     {users.length > 0 &&
    //     <table className="table">
    //         <thead>
    //         <tr>
    //             <th>Имя</th>
    //             <th>Качества</th>
    //             <th>Профессия</th>
    //             <th>Встретился, раз</th>
    //             <th>Оценка</th>
    //             <th>Избранное</th>
    //             <th></th>
    //         </tr>
    //        </thead>
    //         <tbody>
    //              {users.map((user) => (
    //                  <User user={user} onDelete={handleDelete} />
    //              ))}
    //         </tbody>
    //     </table>
    //     }
    //     </>
    // )
}

export default Users;