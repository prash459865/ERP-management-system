import React, { createContext, useContext } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const baseURL = 'https://erp-management-system-ufnb.onrender.com';

  return (
    <ApiContext.Provider value={{ baseURL }}>
      {children}
    </ApiContext.Provider>
  );
};

// Custom hook to use ApiContext
export const useApi = () => useContext(ApiContext);
