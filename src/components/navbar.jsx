import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../constants/context";
import { auth } from "../controllers/firebase/main";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import AvatarImage from "../assets/avatar.jpg";

function NavbarComponent() {

  const context = useContext(UserContext);
  const user = context.user;

  const [authState, setAuthState] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthState(user);
    });

    return () => unsubscribe();
  }, []);

  const navigate = useNavigate()

  const handleAccountState = () => {
    console.log(authState)
    if (authState == null) {
      navigate('/login')
      return;
    }
    auth.signOut();
    console.log("signing out")
    console.log(authState);
  };

  return <Navbar fluid rounded>
    <Navbar.Brand href="/">
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Suraksha Kendra</span>
    </Navbar.Brand>
    <div className="flex md:order-2">
      <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img={AvatarImage} rounded />
        }
      >

        <Dropdown.Item>
          <Link to='/dashboard' className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">My Account</Link>

        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item>
          <div className="p-2 text-sm font-medium text-gray-900">
            <a className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100" onClick={handleAccountState}>{authState == null ? 'Sign in' : 'Sign out'}</a>
          </div>
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
    <Navbar.Collapse className="border-b pb-1">
      <Link className="py-1" to="/">Report</Link>
      <Link className="py-1" to="/map">Map</Link>
      <Link className="py-1" to="/guides">Safety Guides</Link>
      <Link className="py-1" to="/news">News</Link>
      <Link className="py-1" to="/volunteers">Volunteers</Link>
    </Navbar.Collapse>
  </Navbar>

  return <nav className="bg-white antialiased border-b z-50">
    <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="shrink-0">
            <Link to="/" className="flex items-center rtl:space-x-reverse">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">Suraksha Kendra</span>
            </Link>
          </div>

        </div>
        <ul className="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center">

          <li>
            <Link to='/' className="flex text-sm font-medium text-gray-900 hover:text-primary-700">Report</Link>
          </li>
          <li className="shrink-0">
            <Link to='/map' className="flex text-sm font-medium text-gray-900 hover:text-primary-700">Map</Link>
          </li>
          <li>
            <Link to='/guides' className="flex text-sm font-medium text-gray-900 hover:text-primary-700">Safety Guide</Link>
          </li>
          <li>
            <Link to='/news' className="hover:text-primary-700">News</Link>
          </li>
          <li>
            <Link to='/volunteers' className="hover:text-primary-700">Volunteers</Link>
          </li>

        </ul>
        <div className="flex items-center lg:space-x-2">
          <button id="userDropdownButton1" data-dropdown-toggle="account-dropdown" type="button" className="inline-flex items-center rounded-lg justify-center p-2 hover:bg-gray-100 text-sm font-medium leading-none text-gray-900">
            <svg className="w-5 h-5 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth={2} d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            Account
            <svg className="w-4 h-4 text-gray-900 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
            </svg>
          </button>
          <div id="account-dropdown" className="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow">
            <ul className="p-2 text-start text-sm font-medium text-gray-900">
              <li>
                <Link to='/dashboard' className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100">My Account</Link>
              </li>
            </ul>
            <div className="p-2 text-sm font-medium text-gray-900">
              <a className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100" onClick={handleAccountState}>{authState == null ? 'Sign in' : 'Sign out'}</a>
            </div>
          </div>
          <button type="button" data-collapse-toggle="navbar-menu" aria-controls="navbar-menu" aria-expanded="false" className="inline-flex lg:hidden items-center justify-center hover:bg-gray-100 rounded-md p-2 text-gray-900">
            <span className="sr-only">
              Open Menu
            </span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5 7h14M5 12h14M5 17h14" />
            </svg>
          </button>
        </div>
      </div>
      <div id="navbar-menu" className="bg-gray-50 border border-gray-200 rounded-lg py-3 hidden px-4 mt-4">
        <ul className="text-gray-900 text-sm font-medium space-y-3">
          <li>
            <Link to='/' className="hover:text-primary-700">Home</Link>
          </li>
          <li>
            <Link to='/map' className="hover:text-primary-700">Map</Link>
          </li>
          <li>
            <Link to='/guides' className="hover:text-primary-700">Safety Guide</Link>
          </li>
          <li>
            <Link to='/news' className="hover:text-primary-700">News</Link>
          </li>
          <li>
            <Link to='/volunteers' className="hover:text-primary-700">Volunteers</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>


}

export default NavbarComponent