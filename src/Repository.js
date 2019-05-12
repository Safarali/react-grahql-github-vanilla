import React from 'react';
import Issues from './Issues';

const Repository = ({ 
    id,
    name, 
    url, 
    issues, 
    stargazers,
    onFetchMoreIssues,
    onStarRepository,
    viewerHasStarred,
}) => {
    return (
        <div>
            <p>
                <strong>In Repository: </strong>
                <a href={url}>{name}</a>
            </p>
            <button
                type="button"
                onClick={() => onStarRepository(id, viewerHasStarred)}
            >   
                {stargazers.totalCount} &nbsp;
                {viewerHasStarred ? 'Unstar' : 'Star'}
            </button>
            <Issues {...issues}/>
            <hr/>
            {issues.pageInfo.hasNextPage && (
                <button onClick={onFetchMoreIssues}>More</button>
            )}
        </div>
    )
};

export default Repository;