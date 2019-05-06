import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Organization from './Organization';
import Errors from './Errors';
import  getIssuesOfRepositoryQuery from './query'

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});


const App = () => {
    const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');
    const [org, setOrg] = useState();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFromGitHub(path);
    };

    const fetchFromGitHub = async (path) => {
        const [organization, repository] = path.split("/");
        try {
            const  { data } = await axiosGitHubGraphQL.post('', { query: getIssuesOfRepositoryQuery(organization, repository)});
            console.log(data)
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
        fetchFromGitHub(path);
    },[])

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
                <Organization organization={org}/>
            ): (
                <p>{errors ? <Errors errors={errors}/> : 'No information yer'}</p>
            )}
            
        </>
    );
}

export default App;