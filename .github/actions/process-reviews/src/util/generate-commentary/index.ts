import type { KeywordResults } from '../types'


const BASE_WIDTH = 12;


export default (
  results: KeywordResults,
  summary: string,
  cols: [string, string, string, string],
) => {
  let heading = cols.reduce((acc, col) =>
    `${acc}| ${col.padEnd(BASE_WIDTH)} `,
  '');
  heading += '|\n';
  cols.forEach((_, idx) => {
    const [left, right] = idx > 0 ? ['-', ':'] : [':', '-'];
    heading += `|${left}${'-'.repeat(BASE_WIDTH)}${right}`;
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
