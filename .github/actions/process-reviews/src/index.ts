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

const BASE_WIDTH = 12;


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

const generateCommentary = (
  results: KeywordResults,
  summary: string,
  cols: [string, string, string, string],
) => {
  let heading = cols.reduce((acc, col) =>
    `${acc}| ${col.padEnd(BASE_WIDTH)} `,
  '');
  heading += '|\n';
  cols.forEach((_, idx) => {
    heading += `|-${'-'.repeat(BASE_WIDTH)}${idx > 0 ? ':' : '-'}`;
  });
  heading += '|\n';

  const table = Object.entries(results)
    .reduce((acc, [keyword, { weight, count }]) => {
      let t = acc;
      t += `| ${keyword.padEnd(BASE_WIDTH)} `
      t += `| ${weight.toString().padEnd(BASE_WIDTH)} `
      t += `| ${count.toString().padEnd(BASE_WIDTH)} `
      t += `| ${(weight * count).toString().padEnd(BASE_WIDTH)} |\n`
      return t;
    }, heading);

  return `${summary}\n\n---\n\n${table}`;
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

  const experienceSummary = core.getInput('experience-summary');

  const cols: [string, string, string, string] = [
    core.getInput('table-header-keyword') || 'keyword',
    core.getInput('table-header-weight') || 'weight',
    core.getInput('table-header-count') || 'count',
    core.getInput('table-header-total-impact') || 'total impact',
  ];

  const commentary = generateCommentary(results, experienceSummary, cols);
  console.log('generated commentary:', commentary);

  core.setOutput('commentary', commentary);
}

run();
