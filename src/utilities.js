export const resolveIssuesQuery = (queryResult, cursor) => org => {
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

export const resolveStarMutation = (mutationResult, actionName) => org => {
    const { viewerHasStarred } = mutationResult.data[actionName].starrable;
    const { repository } = org;
    const { totalCount } = repository.stargazers;
    return {
        ...org,
        repository: {
            ...repository,
            viewerHasStarred,
            stargazers: {
                totalCount: viewerHasStarred ? totalCount + 1 : totalCount - 1
            }
        }
    }
};

export const createOption = (mutationName, repositoryId) => {
    return {
        method: 'POST',
        data: {
            query: mutationName,
            variables: { repositoryId }
        }
    };
};