import { useSelector } from "react-redux";

import { RootState } from "./store";

import Login from "./components/Login";

const App = (): JSX.Element => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged);

  return isLogged ? <div>application</div> : <Login />;
};

export default App;
