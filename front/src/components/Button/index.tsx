interface Props {
  label: string;
}

const Button = ({ label }: Props): JSX.Element => {
  return <button>{label}</button>;
};

export default Button;
