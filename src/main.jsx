import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import HomeScreen from './screens/home/page.jsx';
import SafetyGuides from './screens/guides/safetyGuide.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NavbarComponent from './components/navbar.jsx';

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
          path: "/guides",
          element: <SafetyGuides></SafetyGuides>
        },
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
