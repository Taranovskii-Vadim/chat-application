import { useLoginMutation } from "./store/auth";

import Login from "./components/Login";

const App = (): JSX.Element => {
  const [login, { data }] = useLoginMutation();

  if (!data) {
    return (
      <Login
        onSubmit={() => {
          login({ login: "admin", password: "admin" });
        }}
      />
    );
  }

  return <div>application</div>;
};

export default App;
