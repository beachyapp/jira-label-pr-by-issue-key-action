const core = require('@actions/core');
const fetch = require('cross-fetch');

try {
  // JIRA issue key regex
  const pattern=/[A-Za-z]{2,}-\d+/g;
  const issueKey = core.getInput('issue-key');
  const labelToAdd = core.getInput('add-label');
  const labelToRemove = core.getInput('remove-label');
  const owner = core.getInput('owner');
  const repo = core.getInput('repo');
  const githubToken = core.getInput('github-token');
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  const options = {
    headers: {
      "Authorization": `token ${githubToken}`,
      "Accept": "application/vnd.github.v3+json",
      "Content-Type": "application/json"
    }
  };

  // get all the pull requests
  fetch(`${url}/pulls`, {
    ...options, 
    method: 'GET'
  })
  .then(res => res.json())
  .then(prs => {
    match = {}
    // for each pull request check JIRA issue key
    prs.forEach(pr => {
      ref = pr.head.ref
      // result of matches
      keys=ref.match(pattern)
      // if no match found
      exists=(keys !== null)
      // get first element if match found
      key=exists?keys[0]:''
      // find pr that matches key
      if(key == issueKey)
        match = pr
    });
    return match;
  })
  .then(pr => {
    // add label(s) to pull request
    if(labelToAdd){
      labelToAddlist = labelToAdd.replace(/\s*,\s*/g, ",").split(',');
      fetch(`${url}/issues/${pr.number}/labels`, {
        ...options, 
        method: 'POST', 
        body: JSON.stringify({ 
          "labels": labelToAddlist
        })
      });
    }

    // remove labels from pull request
    if(labelToRemove){
      labelToRemovelist = labelToRemove.replace(/\s*,\s*/g, ",").split(',');
      labelToRemovelist.forEach(label => {
        fetch(`${url}/issues/${pr.number}/labels/${label}`, {
          ...options, 
          method: 'DELETE'
        });
      });
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
