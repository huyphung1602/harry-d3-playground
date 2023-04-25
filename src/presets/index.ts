import { Preset } from '../types/preset';
import { base } from './base';
import { selection } from './selection';
import { scale } from './scale';
import { axes } from './axes';
import { barChart } from './bar_chart';

export const presets : Preset[] = [
  base,
  selection,
  scale,
  axes,
  barChart,
];
