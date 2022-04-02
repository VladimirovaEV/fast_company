import React, { useState } from 'react';
import Users from './components/users';
import {SearchStatus} from './components/searchStatus';
import User from './components/user';
import api from './api';

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user !== userId));
    }
    
    return (
        <>
        <SearchStatus usersCount={users.length}/>
        {users.length > 0 &&
        <table className="table">
            <thead>
            <tr>
                <th>Имя</th>
                <th>Качества</th>
                <th>Профессия</th>
                <th>Встретился, раз</th>
                <th>Оценка</th>
                <th>Избранное</th>
                <th></th>
            </tr>
           </thead>
            <tbody>
                 {users.map((user) => (
                     <User user={user} onDelete={handleDelete} />
                 ))}
            </tbody>
        </table>
        }
        </>
    )
}

export default App;