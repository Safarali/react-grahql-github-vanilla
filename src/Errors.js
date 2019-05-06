import React from 'react';
const Errors = ({ errors }) => {
    return (
        <>
            {errors.map(error => error.message).join(' ')}
        </>
    )
}

export default Errors;