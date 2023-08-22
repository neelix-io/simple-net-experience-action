import { describe, expect, test } from '@jest/globals';

import generateCommentary from '.';


const keywordResults = {
  good: { count: 2, weight: 4 },
  okay: { count: 0, weight: 1 },
  bad: { count: 1, weight: -4 },
  'dumpster fire': { count: 1, weight: -20 },
};

const summary = 'This is the summary...12345';

const cols: [string, string, string, string] = [
  'my col 1',
  'my col 2',
  'my col 3',
  'my col 4',
];


describe('generate-commentary util function', () => {
  test('returns string with appropriate commentary from provided inputs', () => {
    const commentary = generateCommentary(keywordResults, summary, cols);

    expect(commentary).toMatch(new RegExp(`^${summary}`));

    const hPtn = `\\| +${cols[0]} +\\| +${cols[1]} +\\| +${cols[2]} +\\| +${cols[3]} +\\|`;
    expect(commentary).toMatch(new RegExp(hPtn));

    Object.entries(keywordResults).forEach(([word, { count, weight }]) => {
      const tPtn = `\\| +${word} +\\| +${weight} +\\| +${count} +\\| +${count * weight} +\\|`;
      expect(commentary).toMatch(new RegExp(tPtn));
    });
  });
});
