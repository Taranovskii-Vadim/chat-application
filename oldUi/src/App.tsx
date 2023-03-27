import { observer } from 'mobx-react-lite';

import auth from 'src/store/auth';

import Pages from './pages';
import Login from './components/Login';

// Стек фронта react ts tailwind redux/toolkit

const App = (): JSX.Element => {
  if (!auth.isLogged) {
    return <Login />;
  }

  return <Pages />;
};

export default observer(App);
