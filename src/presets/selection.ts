import { Preset } from '../types/preset';

const html =`
<div></div>
<div></div>
<div></div>
`;

const script = `
const selection = d3.select('.d3-content');

selection
  .selectAll('div')
  .append('p')
  .text('Hello World');
`;

export const selection : Preset = {
  name: 'Selection',
  html,
  script,
}
