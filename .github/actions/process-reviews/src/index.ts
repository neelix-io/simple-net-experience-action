import * as core from '@actions/core';


const run = () => {
  const reviewData = core.getInput('review-data');
  console.log('raw review data:', reviewData);

  const parsedReviews = JSON.parse(reviewData);
  console.log('parsed review data:', parsedReviews);

  const keywords = core.getInput('keywords')
    .split(':')
    .map(w => w.split(',') as [string, string])
    .map(([v, wString]) => [v, +wString] as [string, number]);
  console.log('keywords:', keywords);

  let weight = 0;
  for (const review of parsedReviews) {
    for (const [v, w] of keywords) {
      const re = new RegExp(v, 'g');
      weight += ((<string>review.body)?.match(re)?.length || 0) * w;
    }
  }

  core.setOutput('weight', weight);
  core.setOutput('commentary', 'Commentary output from "process-reviews" action');
}

run();
