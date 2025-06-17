import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useApi } from '../Contexts/ApiContext';
import axios from 'axios';

const ProtectedUI = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const { baseURL } = useApi();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/uiValidation`, {
          withCredentials: true,
        });
        setIsAuth(res.data.authenticated);
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuth();
  }, [baseURL]);

  if (isAuth === null) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedUI;
