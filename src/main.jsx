import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import HomeScreen from './screens/home/page.jsx';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NavbarComponent from './components/navbar.jsx';
import { app } from './controllers/firebase/main.jsx';

const AppLayout = () => {

  return (
    <div className='flex flex-col' style={{height: "100dvh"}}>
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
      children:[
        {
          path: "/",
          element: <HomeScreen></HomeScreen>
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
