import { Navigate, Outlet } from 'react-router-dom';
import SigninSide from './authSide';
import { useUserContext } from '@/contexts/AuthProvider';

const AuthLayout = () => {
  
  const { isAuthenticated } = useUserContext();  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <div className="flex-center flex-1">
            <Outlet />
          </div >
          <div className='md:block hidden w-1/2 overflow-hidden'>
            <SigninSide/>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;
