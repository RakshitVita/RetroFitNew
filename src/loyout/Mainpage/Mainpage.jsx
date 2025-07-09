// layout/MainLayout.jsx
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/NavBar/Navbar';
import { Outlet } from 'react-router-dom';

const MainPage = () => (
  <div className="flex h-screen">
    <Sidebar />
    <div className="flex flex-col flex-1 bg-gray-50 overflow-y-auto">
      <Navbar />
      <main className="p-6">
        <Outlet /> {/* This will render the dynamic page */}
      </main>
    </div>
  </div>
);

export default MainPage;
