import React from 'react';
import Repository from './Repository';

const Organization = ({ organization }) => {
    return (
        <div>
            <p>
                <strong>Issues from Organization: </strong>
                <a href={organization.url}>{organization.name}</a>
            </p>
            <Repository {...organization.repository}/>
        </div>
    );
};

export default Organization;

