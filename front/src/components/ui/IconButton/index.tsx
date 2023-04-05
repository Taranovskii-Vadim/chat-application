import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  children: ReactNode;
};

const IconButton = ({ children, className, ...props }: Props): JSX.Element => (
  <button
    className={`text-sky-500 hover:text-sky-600 ease-in duration-200 hover:bg-sky-100 rounded-full p-1.5 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default IconButton;
