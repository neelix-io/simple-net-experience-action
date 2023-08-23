# Neelix Simple Net Experience

This GitHub action creates a Neelix Experience where the "weight" is derived
from PR reviews. It's intended to be used only on `pull_request: closed` events
and may break or have unexpected behavior on other events. If you're looking
for an action with more direct control over the Experience created, check out
[create-experience-action](https://github.com/neelix-io/create-experience-action).

## Usage

You will first need to obtain a Neelix API token for your action. Directions
can be found [here](https://platform.neelix.io/api). Be sure to keep your token
secure. We recommend storing it as a
[secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets).
Next get the ID for the consortium for your experiences. This can be found using the
[API Developer helper tool](https://platform.neelix.io/api-developer-helper).
Provide the target consortium ID to the action, as well as any additional
parameters you would like to include.

### Example:

```yaml
name: Create Neelix Simple Net Experience

on:
  pull_request:
    types:
      - closed

jobs:
  create-simple-net-experience:
    runs-on: ubuntu-latest
    steps:
      - uses: neelix-io/create-simple-net-experience-action@v1
        with:
          api-token: ${{ secrets.TEST_API_TOKEN }}
          consortium-id: ${{ vars.CONSORTIUM_ID }}
          experience-summary: ${{ vars.SUMMARY }}
          keywords: |
            {
              "bad": -2,
              "needs improvement": -1,
              "okay": 1,
              "really great": 3,
            }
          activity-id: ${{ vars.ACTIVITY_ID }}
          category-ids: ${{ vars.CATEGORY_IDS }}
          team-ids: ${{ vars.TEAM_IDS }}
```

### Inputs

* api-token (required): A valid Neelix API token with access to the specified
  consortium
* consortium-id (required): ID of target consortium
* experience-summary (required): Message to appear above table in experience
  commentary
* keywords (required): Keywords and weights to use in calculating weight for
  experiences. Should be provided as a JSON string (see example).
* activity-id: ID of an activity belonging to same consortium as experience.
  Sets `activity_id` field of new experience.
* category-ids: IDs of categories belonging to same consortium as experience.
  Use comma-separated list for multiple values (e.g. "1,2,3"). Adds specified
  categories to new experience.
* team-ids: IDs of teams belonging to same consortium as experience. Use
  comma-separated list for multiple values (e.g. "1,2,3"). Adds specified teams
  to new experience.
* table-header-keyword: Name used for "keyword" column. Default: "keyword"
* table-header-weight: Name used for "weight" column. Default: "weight"
* table-header-count: Name used for "count" column. Default: "count"
* table-header-total-impact: Name used for "total impact" column. Default:
  "total impact"
* github-token: GitHub token used to authenticate against GitHub API to
  retrieve PR review data. Default: GITHUB_TOKEN from github context.

