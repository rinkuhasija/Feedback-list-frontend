import { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // values we want to share
  const authContextValues = {
    isLoggedIn,
    setIsLoggedIn,
  };

  // Provide the context and its values to the child components
  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
