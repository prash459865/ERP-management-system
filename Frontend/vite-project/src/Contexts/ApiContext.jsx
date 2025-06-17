import React, { createContext, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const baseURL = 'http://localhost:4000';

  return (
    <ApiContext.Provider value={{ baseURL }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use ApiContext
export const useApi = () => useContext(ApiContext);
