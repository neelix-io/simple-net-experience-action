import * as core from '@actions/core';

import processKeywords from './util/process-keywords'
import generateCommentary from './util/generate-commentary'


const run = () => {
  const reviewData = core.getInput('review-data');
  core.debug(`raw review data: ${reviewData}`);

  const parsedReviews = JSON.parse(reviewData);
  core.debug(`parsed review data: ${parsedReviews}`);

  const rawKeywordsInput = core.getInput('keywords');
  core.debug(`raw keywords input: ${rawKeywordsInput}`);

  const keywords = JSON.parse(rawKeywordsInput);
  core.debug(`parsed keywords input: ${keywords}`);

  const results = processKeywords(keywords, parsedReviews);

  const totalCount = Object.values(results)
    .reduce((acc, { count }) => acc + count, 0);
  if (totalCount < 1) {
    core.setOutput('no-match', true);
    return;
  }

  const aggWeight = Object.values(results)
    .reduce((acc, { count, weight }) => acc + (count * weight), 0);

  core.setOutput('weight', aggWeight);

  const experienceSummary = core.getInput('experience-summary');

  const cols: [string, string, string, string] = [
    core.getInput('table-header-keyword') || 'keyword',
    core.getInput('table-header-weight') || 'weight',
    core.getInput('table-header-count') || 'count',
    core.getInput('table-header-total-impact') || 'total impact',
  ];

  const commentary = generateCommentary(results, experienceSummary, cols);

  core.setOutput('commentary', commentary);
}

run();
