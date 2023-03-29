import { FormEvent } from "react";

import auth from "src/store/auth";

import Input from "../Input";
import Button from "../Button";

const Login = (): JSX.Element => (
  <form
    className="absolute space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 text-center"
    onSubmit={(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.login({ login: "admin", password: "admin" });
    }}
  >
    <Input />
    <Input type="password" />
    <Button type="submit" label="Войти" />
  </form>
);

export default Login;
