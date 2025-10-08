import { DotProps } from 'recharts';

export interface CustomDotProps extends DotProps {
  index?: number;
  payload?: { time: string; value: number; sales: number };
}