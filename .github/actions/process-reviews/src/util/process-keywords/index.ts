import type { KeywordResults } from '../types'


type ReviewData = {
  body: string;
}


export default (
  keywords: { [keyword: string]: number },
  reviews: ReviewData[],
) => {
  const results: KeywordResults = {};
  for (const [keyword, weight] of Object.entries(keywords)) {
    let count = 0;
    for (const review of reviews) {
      const re = new RegExp(keyword, 'g');
      count += ((<string>review.body)?.match(re)?.length || 0);
    }
    results[keyword] = { count, weight }
  }
  return results;
}
