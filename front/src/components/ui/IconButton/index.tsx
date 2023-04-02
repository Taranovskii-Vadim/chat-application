import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const IconButton = ({ children }: Props): JSX.Element => (
  <button className="text-sky-500 hover:text-sky-600 ease-in duration-200 hover:bg-sky-100 rounded-full p-1.5">
    {children}
  </button>
);

export default IconButton;
