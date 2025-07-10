// routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../loyout/Mainpage/Mainpage.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Home from '../pages/Home/Home.jsx';
import Download from '../pages/DownloadPage/Download.jsx';
import Subscription from '../pages/Subscription/Subscription.jsx';
import Introduction from '../pages/Introduction/Introduction.jsx';
import Homepage from '../pages/MainPage/Homepage.jsx';
import ProtectedRoute from '../utils/protectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      { path: '/demo', element: <Home /> },
      { path: '/introduction', element: <Introduction /> },
      { path: '/home', element: <Homepage /> },
      {
        element: <ProtectedRoute/>,
        children: [
          { path: '/dashboard', element: <Dashboard /> },
          { path: '/download-log', element: <Download /> },
          { path: '/subscription', element: <Subscription /> },
          
        ],
      },
    ],
  },
]);

export default router;