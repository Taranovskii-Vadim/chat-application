import { observer } from 'mobx-react-lite';

import auth from 'src/store/auth';

import Pages from './pages';
import Login from './components/Login';

// TODO we can remove isEdited from DB again, because we delete pin logic. Even with pin logic we dont need isEdited

const App = (): JSX.Element => {
  if (!auth.isLogged) {
    return <Login />;
  }

  return <Pages />;
};

export default observer(App);
