import { describe, expect, test } from '@jest/globals';

import processKeywords from '.';


const keywords = {
  'good': 4,
  'okay': 1,
  'bad': -4,
  'dumpster fire': -20,
}

const reviews = [
  { body: 'Good' },
  { body: 'very good' },
  { body: 'a really bad approach' },
  { body: 'dumpster with a huge fire' },
  { body: 'a bit of a dumpster fire, I think' },
];

const expectedOutput = {
  good: { count: 2, weight: 4 },
  okay: { count: 0, weight: 1 },
  bad: { count: 1, weight: -4 },
  'dumpster fire': { count: 1, weight: -20 },
};


describe('process-keywords util function', () => {
  test('returns keyword count and weight for provided review data', () => {
    expect(processKeywords(keywords, reviews)).toEqual(expectedOutput);
  });
});
