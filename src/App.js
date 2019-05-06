import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Organization from './Organization';
import { GET_ORGANIZATION } from './query';

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});


const App = () => {
    const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');
    const [org, setOrg] = useState({});
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const fetchFromGitHub = async () => {
        try {
            const  { data } = await axiosGitHubGraphQL.post('', { query: GET_ORGANIZATION });
            if(data.data) {
                setOrg(data.data.organization)
            } else {
                setErrors(data.errors);
            }
        } catch(e) {
            console.log(e)
        }
    }

    //componentDidMount
    useEffect(() => {
        fetchFromGitHub();
    }, [])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="url">
                    Show open issues for https://github.com
                </label>
                <input 
                    id="url"
                    type="text"
                    onChange={(e) => setPath(e.target.value)}
                    value={path}
                    className="form__input"
                />
                <button type="submit">Search</button>
            </form>
            <hr/>
            {org ? (
                <Organization organization={org} errors={errors}/>
            ): (
                <p>No Information yet</p>
            )}
            
        </>
    );
}

export default App;