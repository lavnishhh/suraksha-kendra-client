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
<<<<<<< HEAD
          path: '/test',
          element: <TestComponent></TestComponent>
        }
=======
          path: "/signin",
          element: <SignInForm></SignInForm>
        },
>>>>>>> e50f50d1bd8b17393876feb0410d769edf6bbe11
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
