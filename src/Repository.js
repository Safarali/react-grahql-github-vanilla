import React from 'react';
import Issues from './Issues';

const Repository = ({ name, url, issues, onFetchMoreIssues }) => {
    return (
        <div>
            <p>
                <strong>In Repository: </strong>
                <a href={url}>{name}</a>
            </p>
            <Issues {...issues}/>
            <hr/>
            {issues.pageInfo.hasNextPage && (
                <button onClick={onFetchMoreIssues}>More</button>
            )}
        </div>
    )
};

export default Repository;