import { useDispatch } from "react-redux";

import { login } from "src/store/auth";

import Input from "../Input";
import Button from "../Button";

const Login = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    dispatch(login());
  };

  return (
    <form
      className="absolute space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 text-center"
      onSubmit={handleSubmit}
    >
      <Input />
      <Input type="password" />
      <Button type="submit" label="Войти" />
    </form>
  );
};

export default Login;
