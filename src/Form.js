import React from 'react';

const Form = ({ handleSubmit, handleOnChange, path }) => {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="url">
                Show open issues for https://github.com
            </label>
            <input 
                id="url"
                type="text"
                onChange={(e) => handleOnChange(e)}
                value={path}
                className="form__input"
            />
            <button type="submit">Search</button>
        </form>
    )
};

export default Form;