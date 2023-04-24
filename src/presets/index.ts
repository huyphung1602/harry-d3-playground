import { Preset } from '../types/preset';
import { base } from './base';
import { selection } from './selection';
import { barChart } from './bar_chart';

export const presets : Preset[] = [
  base,
  selection,
  barChart,
];
