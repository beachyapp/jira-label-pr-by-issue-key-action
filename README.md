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
  uses: beachyapp/jira-label-pr-by-issue-key@v0.1
  with:
    issue-key: ${{ github.event.client_payload.issue_key }} #this request payload comes from JRIA
    add-label: "enhancement, feature"
    remove-label: "bug"
    github-token: ${{ secrets.GITHUB_TOKEN }}
    owner: ${{ github.repository_owner }}
    repo: ${{ github.event.repository.name }}
```
