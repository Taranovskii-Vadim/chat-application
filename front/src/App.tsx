import { observer } from 'mobx-react-lite';

// TODO vite resolve alias but ts not
// TODO generate temp message id to show it in ui

import auth from 'src/store/auth';

import Pages from './pages';
import Login from './components/Login';

const App = (): JSX.Element => {
  if (!auth.isLogged) {
    return <Login />;
  }

  return <Pages />;
};

export default observer(App);
