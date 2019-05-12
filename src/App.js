import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Organization from './Organization';
import Errors from './Errors';
import Form from  './Form';
import { GET_ISSUES_OF_REPOSITORY, ADD_STAR, REMOVE_STAR } from './graphql';
import { resolveIssuesQuery, resolveStarMutation, createOption } from './utilities';

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

    const addStarToRepository = async repositoryId => {
        const options = createOption(ADD_STAR, repositoryId);
        const { data } = await axiosGitHubGraphQL(options);
        setOrg(resolveStarMutation(data, 'addStar'));

    };

    const removeStarFromRepository = async repositoryId => {
        const options = createOption(REMOVE_STAR, repositoryId)
        const { data } = await axiosGitHubGraphQL(options);
        setOrg(resolveStarMutation(data, 'removeStar'));
    };

  
    const onFetchMoreIssues = () => {
        const { endCursor } = org.repository.issues.pageInfo;
        fetchFromGitHub(path, endCursor);
    };

    const onStarRepository = (repositoryId, viewerHasStarred) => {
        if (!viewerHasStarred) {
            addStarToRepository(repositoryId);
        } else {
            removeStarFromRepository(repositoryId);
        }
    }

    const handleOnChange = e => {
        setPath(e.target.value);
    };

    //componentDidMount
    useEffect(() => {
        fetchFromGitHub(path);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <>
            <Form
                handleSubmit={handleSubmit}
                handleOnChange={handleOnChange}
                path={path}
            />
            <hr/>
            {org ? (
                <Organization 
                    organization={org} 
                    onFetchMoreIssues={onFetchMoreIssues}
                    onStarRepository={onStarRepository}
                />
            ): (
                <p>{errors ? <Errors errors={errors}/> : 'No information yet'}</p>
            )}
        </>
    );
}

export default App;