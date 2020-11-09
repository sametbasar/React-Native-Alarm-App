import React, {useState} from 'react';
import AuthContext from './AuthContext';

const Providers = ({children}) => {
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    identityNumber: '',
    contacts: [],
    badges: [],
  });

  updateUser = (user) => {
    setUser(user);
  };
  return (
    <AuthContext.Provider value={{user, updateUser: updateUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export default Providers;
