# Label PR by JIRA issue key

This action can add and/or remove label from pull request associated with a given issue key

## Inputs

## `issue-key`

**Required** The JIRA issue key that is associated with the pull request

## `add-label`

Label(s) string to add to the pull request

## `remove-label`

Label(s) string to remove from the pull request

## `owner`

**Required** Name of the owner or organization name of the repository 

## `repo`

**Required** The repo that contains all the pull requests

## `github-token`

**Required** Github token to allow add/removing of label on pull requests

## Example usage

```
<!-- Label PR by JIRA issue key -->
- name: Add and Remove label from PR by JIRA issue key
  uses: beachyapp/jira-label-pr-by-issue-key-action@v0.2
  with:
    issue-key: ${{ github.event.client_payload.issue_key }} #this request payload comes from JRIA
    add-label: "enhancement, feature"
    remove-label: "bug"
    github-token: ${{ secrets.GITHUB_TOKEN }}
    owner: ${{ github.repository_owner }}
    repo: ${{ github.event.repository.name }}
```

## Compiling and pushing changes

Checking in your node_modules directory can cause problems. As an alternative, you can use a tool called @vercel/ncc to compile your code and modules into one file used for distribution.

Install vercel/ncc by running this command in your terminal.

`npm i -g @vercel/ncc`

Compile your index.js file.

`ncc build index.js --license licenses.txt`

You'll see a new dist/index.js file with your code and the compiled modules. You will also see an accompanying dist/licenses.txt file containing all the licenses of the node_modules you are using.

Change the main keyword in your action.yml file to use the new dist/index.js file.

`main: 'dist/index.js'`

If you already checked in your node_modules directory, remove it.

`rm -rf node_modules/*`

From your terminal, commit the updates to your action.yml, dist/index.js, and node_modules files.

```shell
git add action.yml dist/index.js node_modules/*
git commit -m "Use vercel/ncc"
git tag -a -m "My first action release" v1.1
git push --follow-tags
```
