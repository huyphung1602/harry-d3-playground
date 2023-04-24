import { Preset } from '../types/preset';

const html =`
<div></div>
<div></div>
<div></div>
`;

const script = `
const d3Content = d3.select('.d3-content');
d3Content.selectAll('div').append('p').text('Hello World');
`;

export const selection : Preset = {
  name: 'Selection',
  html,
  script,
}
