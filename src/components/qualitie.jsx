import React from 'react';

export const getQualClasses = (color) => {
        let classItem = "badge m-2 bg-"
        classItem = classItem + color;
        return classItem;
    }