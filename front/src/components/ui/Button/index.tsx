import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
  label: string;
};

const Button = ({ label }: Props): JSX.Element => (
  <button className="bg-sky-500 hover:bg-sky-600 rounded-md text-white py-1.5 px-4 ease-in duration-200">
    {label}
  </button>
);

export default Button;
