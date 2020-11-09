import {createContext} from 'react';

export default AuthContext = createContext({
  user: {},
  updateUser: (user) => {},
});
