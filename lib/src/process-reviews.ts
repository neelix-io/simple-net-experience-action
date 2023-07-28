import * as core from '@actions/core';


const run = () => {
  const reviewData = core.getInput('review-data');
  console.log('review data:', reviewData);
  const keywords = core.getInput('keywords');
  console.log('keywords:', keywords);

  core.setOutput('commentary', 'Commentary output from "process-reviews" action');
}

run();
