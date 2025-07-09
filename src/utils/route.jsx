// routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import MainPage from '../loyout/Mainpage/Mainpage.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import Home from '../pages/Home/Home.jsx';
import Download from '../pages/DownloadPage/Download.jsx';
import Subscription from '../pages/Subscription/Subscription.jsx';
import Introduction from '../pages/Introduction/Introduction.jsx';
// import Home from './pages/Home';
// import Introduction from './pages/Introduction';
// import DownloadLog from './pages/DownloadLog';
// import Subscription from './pages/Subscription';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage/>,
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/home', element:  <Home/>},
      { path: '/', element: <Introduction/> },
      { path: '/download-log', element:  <Download /> },
      { path: '/subscription', element:  <Subscription />},
    ],
  },
]);

export default router;