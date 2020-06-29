import React from 'react';

const Results = (props) => {
    return (
        <div className="container">
            <p>Casting Time: {props.data.casting_time}</p>
        </div>
    )
}

export default Results