import { Preset } from '../types/preset';
import { base } from './base';
import { selection } from './selection';
import { scale } from './scale';
import { axes } from './axes';
import { transition } from './transition';
import { barChart } from './barChart';
import { barChartWithTransition } from './barChartWithTransition';

export const presets : Preset[] = [
  base,
  selection,
  scale,
  axes,
  transition,
  barChart,
  barChartWithTransition
];
