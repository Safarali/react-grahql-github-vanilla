import React from 'react';

const Issues = ({ edges }) => {
    return (
        <ul>
            { edges && edges.map(issue => (
                <li key={issue.node.id}>
                    <a href={issue.node.title}>{issue.node.title}</a>
                </li>
            ))}
        </ul>
    )
};

export default Issues;