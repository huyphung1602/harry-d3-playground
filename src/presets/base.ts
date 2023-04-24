import { Preset } from '../types/preset';

const html = '';

const script = `
const d3Content = d3.select('.d3-content');
`;

export const base : Preset = {
  name: 'Default',
  html,
  script,
}
