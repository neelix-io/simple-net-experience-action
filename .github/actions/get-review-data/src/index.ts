import * as core from '@actions/core';
import * as github from '@actions/github';


const token = core.getInput('github-token', { required: true });
const octokit = github.getOctokit(token);
const repo = github.context.repo;
const pullNumber = +core.getInput('pr-number', { required: true });


const run = async () => {
  try {
    const params = { ...repo, pull_number: pullNumber };
    const [reviews, comments] = await Promise.all([
      octokit.paginate(octokit.rest.pulls.listReviews, params),
      octokit.paginate(octokit.rest.pulls.listReviewComments, params),
    ]);

    core.debug(`reviews:\n${JSON.stringify(reviews, null, 2)}`);
    core.debug(`\ncomments:\n${JSON.stringify(comments, null, 2)}`);

    const data = reviews.map(({ body }) => ({ body }));
    data.push(...comments.map(({ body }) => ({ body })));

    core.setOutput('data', data);
  } catch (err) {
    let error: string | Error = 'Unknown error';
    if (typeof err === 'string') {
      error = err;
    } else if (err instanceof Error) {
      error = err;
    } else if (err && typeof err === 'object' && 'message' in err) {
      error = JSON.stringify(err.message);
    }
    core.setFailed(error);
  }
}

run();
