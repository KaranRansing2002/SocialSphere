import { getCurrentUser } from "@/lib/appwrite/api";
import { TUser, TContextType } from "@/types"
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const initialUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: ''
}

const initialState = {
  user: initialUser,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => { },
  setIsAuthenticated: () => { },
  checkAuthUser: async () => false as boolean
}

const AuthContext = createContext<TContextType>(initialState);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<TUser>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  
  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();
      
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio
        })
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('cookieFallback') === null || localStorage.getItem('cookieFallback') === '[]') {
      navigate('/signin');
      return;
    }
    checkAuthUser();
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
