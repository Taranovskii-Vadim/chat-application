import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { label: string };

const Button = ({ label }: Props): JSX.Element => (
  <button className="bg-indigo-500 hover:bg-indigo-600 rounded-md text-white py-2 px-4 ease-in duration-200 w-3/4">
    {label}
  </button>
);

export default Button;
