import * as core from '@actions/core';


type ReviewData = {
  body: string;
}

type KeywordResults = {
  [keyword: string]: {
    count: number;
    weight: number;
  };
}


const processKeywords = (keywords: [string, number][], reviews: ReviewData[]) => {
  const results: KeywordResults = {};
  for (const [keyword, weight] of keywords) {
    let count = 0;
    for (const review of reviews) {
      const re = new RegExp(keyword, 'g');
      count += ((<string>review.body)?.match(re)?.length || 0);
    }
    results[keyword] = { count, weight }
  }
  return results;
}

const generateCommentary = (results: KeywordResults) => {
  // columns: keyword, weight, count, total impact
  const cols = ['keyword', 'weight', 'count', 'total impact'];

  let heading = cols.reduce((acc, col) => `${acc}| ${col.padEnd(10)} `, '');
  heading += '|\n';
  cols.forEach(() => {
    heading += `|-${'-'.repeat(10)}-`;
  });
  heading += '|\n';

  return Object.entries(results).reduce((acc, [keyword, { weight, count }]) => {
    let t = acc;
    t += `| ${keyword.padEnd(10)} `
    t += `| ${weight.toString().padEnd(10)} `
    t += `| ${count.toString().padEnd(10)} `
    t += `| ${(weight * count).toString().padEnd(10)} |\n`
    return t;
  }, heading);
}

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

  const results = processKeywords(keywords, parsedReviews);

  const aggWeight = Object.values(results)
    .reduce((acc, { count, weight }) => acc + (count * weight), 0);

  core.setOutput('weight', aggWeight);

  const commentary = generateCommentary(results);
  console.log('generated commentary:', commentary);

  core.setOutput('commentary', commentary);
}

run();
