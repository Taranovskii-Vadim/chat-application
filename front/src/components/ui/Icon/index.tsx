import { IconType } from './types';
import { PATHS } from './constants';

interface Props {
  type: IconType;
}

const Icon = ({ type }: Props): JSX.Element => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    {PATHS[type]}
  </svg>
);

export default Icon;
