import React from 'react';
import Repository from './Repository';

const Organization = ({ organization, onFetchMoreIssues, onStarRepository }) => {
    return (
        <div>
            <p>
                <strong>Issues from Organization: </strong>
                <a href={organization.url}>{organization.name}</a>
            </p>
            <Repository 
                {...organization.repository } 
                onFetchMoreIssues={onFetchMoreIssues}
                onStarRepository={onStarRepository}
            />
        </div>
    );
};

export default Organization;

