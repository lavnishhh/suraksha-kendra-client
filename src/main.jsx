import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import HomeScreen from './screens/home/page.jsx';
import SafetyGuides from './screens/guides/safetyGuide.jsx';
import SignInForm from './screens/signin/signin.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NavbarComponent from './components/navbar.jsx';
import { app } from './controllers/firebase/main.jsx';
import MapScreen from './screens/map/page.jsx';
import { ContextProvider } from './constants/context.jsx';
import { LoginScreen } from './screens/user/login_screen.jsx';
import DashboardScreen from './screens/user/dashboard_screen.jsx';
import News from './screens/News/news.jsx';
import 'flowbite'

import TestComponent from './screens/test/test';

const AppLayout = () => {

  return (
    <div className='flex flex-col' style={{ height: "100dvh" }}>
      <NavbarComponent></NavbarComponent>
      <Outlet></Outlet>
    </div>
  );
};


const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <HomeScreen></HomeScreen>
        },
        {
          path: "/map",
          element: <MapScreen></MapScreen>
        },
        {
          path: "/guides",
          element: <SafetyGuides></SafetyGuides>
        },
        {
          path: '/login',
          element: <LoginScreen></LoginScreen>
        },
        {
          path: '/dashboard',
          element: <DashboardScreen></DashboardScreen>
        },
        {
          path: '/news',
          element: <News></News>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>,
)
