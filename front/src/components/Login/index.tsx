import { FormEvent, useRef } from 'react';

import auth from 'src/store/auth';

import Input from '../ui/Input';
import Button from '../ui/Button';

const Login = (): JSX.Element => {
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (loginRef.current && passwordRef.current) {
      auth.login({ login: loginRef.current.value, password: passwordRef.current.value });
    }
  };

  return (
    <form
      className="absolute space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 text-center"
      onSubmit={handleSubmit}
    >
      <Input ref={loginRef} />
      <Input ref={passwordRef} type="password" />
      <Button className="w-3/4" type="submit" label="Войти" />
    </form>
  );
};

export default Login;
