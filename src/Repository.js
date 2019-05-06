import React from 'react';
import Issues from './Issues';

const Repository = ({ name, url, issues }) => {
    return (
        <div>
            <p>
                <strong>In Repository: </strong>
                <a href={url}>{name}</a>
            </p>
            <Issues {...issues}/>
        </div>
    )
};

export default Repository;