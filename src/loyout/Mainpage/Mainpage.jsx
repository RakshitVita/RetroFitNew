import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';
import './MainPage.css'; // Import your CSS file

const MainPage = () => (
  <div className="main-page">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      <main className="page-body">
        <Outlet />
      </main>
    </div>
  </div>
);

export default MainPage;