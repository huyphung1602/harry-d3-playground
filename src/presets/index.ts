import { Preset } from '../types/preset';
import { baseSvg } from './baseSvg';
import { selection } from './selection';
import { scale } from './scale';
import { axes } from './axes';
import { transition } from './transition';
import { dataBinding } from './dataBinding';
import { barChart } from './barChart';
import { barChartWithTransition } from './barChartWithTransition';

export const presets : Preset[] = [
  baseSvg,
  selection,
  scale,
  axes,
  transition,
  dataBinding,
  barChart,
  barChartWithTransition
];
