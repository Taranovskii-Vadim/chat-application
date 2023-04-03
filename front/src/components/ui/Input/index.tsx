import { DetailedHTMLProps, ForwardedRef, InputHTMLAttributes, forwardRef } from 'react';

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>): JSX.Element => (
    <input
      ref={ref}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
      {...props}
    />
  ),
);

export default Input;
