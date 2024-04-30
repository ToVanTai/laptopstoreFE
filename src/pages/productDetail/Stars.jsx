import React from "react";
/**hiển thị các ngôi sao... */
const Stars = ({ count }) => {
    return (
        <div className="stars__wrapper">
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
            <input type="radio" name="star"/>
        </div>
    );
};

export default Stars;
