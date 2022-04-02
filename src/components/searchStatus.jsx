import React from 'react';
import Users from './users';

export const SearchStatus = (props) => {
    
    const renderPhrase = (number) => {
        if(props.usersCount === 2 || props.usersCount === 3 || props.usersCount=== 4) {
            return <span>человека тусанут</span>
        } else {
            return <span>человек тусанет</span>
        }
    }
    const formatCount = () => {
        return props.usersCount === 0 ? <h2>Никто с тобой не тусанет</h2> : 
        <h2>{props.usersCount} {renderPhrase()} с тобой сегодня</h2>;
    };
    const getBadgeClasses = () => {
        let classes = "badge ";
        classes += props.usersCount=== 0 ? "bg-danger" : "bg-primary";
        return classes
    };
    return (
        <span className={getBadgeClasses()}>{ formatCount() }</span>
    )
};

