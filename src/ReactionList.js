import React from 'react';

const ReactionList = ({ edges }) => {
    return (
        <ul>
            {edges && edges.map(reaction => (
                <li key={reaction.node.id}>{reaction.node.content}</li>
            ))}
        </ul>
    )
};

export default ReactionList;