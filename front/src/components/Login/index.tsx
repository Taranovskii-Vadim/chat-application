import Input from "../Input";
import Button from "../Button";

const Login = (): JSX.Element => (
  <div className="absolute space-y-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 text-center">
    <Input />
    <Input type="password" />
    <Button label="Войти" />
  </div>
);

export default Login;
