import { observer } from "mobx-react-lite";

import auth from "./store/auth";

import Login from "./components/Login";

const App = (): JSX.Element => {
  return auth.isLogged ? <div>application</div> : <Login />;
};

export default observer(App);
