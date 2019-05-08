import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Organization from './Organization';
import Errors from './Errors';
import { GET_ISSUES_OF_REPOSITORY } from './query';

const axiosGitHubGraphQL = axios.create({
    baseURL: 'https://api.github.com/graphql',
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
    }
});

const resolveIssuesQuery = (queryResult, cursor) => org => {
    const { organization: fetchedData } = queryResult.data; 
    if (!cursor) {
        return fetchedData;
    }

    const { edges: oldIssues } = org.repository.issues;
    const { edges: newIssues } = fetchedData.repository.issues;
    const updatedIssues = [...oldIssues, ...newIssues];

    return {
        ...fetchedData,
        repository: {
            ...fetchedData.repository,
            issues: {
                ...fetchedData.repository.issues,
                edges: updatedIssues
            }
        }
    }
};


const App = () => {
    const [path, setPath] = useState('the-road-to-learn-react/the-road-to-learn-react');
    const [org, setOrg] = useState();
    const [errors, setErrors] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchFromGitHub(path);
    };

    const fetchFromGitHub = async (path, cursor) => {
        const [organization, repository] = path.split("/");
        const variables = { organization, repository, cursor };
        const options = {
            method: 'POST',
            data: {
                query: GET_ISSUES_OF_REPOSITORY,
                variables
            }
        }
        try {
            const  { data } = await axiosGitHubGraphQL(options);
            console.log(data) 
            if(data.data) {
                setOrg(resolveIssuesQuery(data, cursor))
            } else {
                setErrors(data.errors);
            }
        } catch(e) {
            console.log(e)
        }
    };

    const onFetchMoreIssues = () => {
        const { endCursor } = org.repository.issues.pageInfo;
        fetchFromGitHub(path, endCursor);
    };

    //componentDidMount
    useEffect(() => {
        fetchFromGitHub(path);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                <Organization 
                    organization={org} 
                    onFetchMoreIssues={onFetchMoreIssues}
                />
            ): (
                <p>{errors ? <Errors errors={errors}/> : 'No information yer'}</p>
            )}
            
        </>
    );
}

export default App;