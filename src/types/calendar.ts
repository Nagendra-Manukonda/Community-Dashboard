export interface DayProps extends React.HTMLAttributes<HTMLDivElement> {
  day?: { date: Date };
  selected?: boolean;
  today?: boolean;
  outside?: boolean;
}
