import React from 'react';
import ReactionList from './ReactionList';

const Issues = ({ edges }) => {
    return (
        <ul>
            { edges && edges.map(issue => (
                <li key={issue.node.id}>
                    <a href={issue.node.url}>{issue.node.title}</a>
                    <ReactionList {...issue.node.reactions}/>
                </li>
            ))}
        </ul>
    )
};

export default Issues;