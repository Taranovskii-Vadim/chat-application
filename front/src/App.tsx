import { observer } from 'mobx-react-lite';

import auth from './store/auth';

import Pages from './pages';
import Login from './components/Login';

const App = (): JSX.Element => {
  return <Login />;
  //   return auth.isLogged ? <Pages /> : <Login />;
};

export default observer(App);
