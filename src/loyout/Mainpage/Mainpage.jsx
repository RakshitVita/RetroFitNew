import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/NavBar/Navbar';
import useAuthStore from '../../Zustand_State/AuthStore';
import { Loader } from 'lucide-react';
import './MainPage.css';

const MainPage = () => {
  const { authUser, checkAuth, isChecking, isLoggingIn } = useAuthStore();

  useEffect(() => {
    checkAuth(); // only on first mount
  }, [checkAuth]);

  const isLoading = isChecking || isLoggingIn;

  return (
    <div className="main-page">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-body">
          {isLoading ? (
            <div className="centered-loader">
              <Loader className="loader-icon" />
              <p>Checking authentication...</p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default MainPage;
