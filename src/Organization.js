import React from 'react';
import Repository from './Repository';

const Organization = ({ organization, onFetchMoreIssues }) => {
    return (
        <div>
            <p>
                <strong>Issues from Organization: </strong>
                <a href={organization.url}>{organization.name}</a>
            </p>
            <Repository 
                {...organization.repository } 
                onFetchMoreIssues={onFetchMoreIssues}
            />
        </div>
    );
};

export default Organization;

