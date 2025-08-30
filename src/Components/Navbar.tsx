// src/Components/Navbar.tsx
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { useAuth } from "../features/useAuth";
import { Link } from "react-router";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useAuth(); // useAuth hook use

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (isLoading) {
    return (
      <div className="navbar bg-base-100 shadow-sm">
        <p className="px-4 py-2">Loading...</p>
      </div>
    );
  }

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li><a>Item 3</a></li>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <>
            <p className="mr-2">{user.email}</p>
            <button onClick={handleLogout} className="btn">
              Log Out
            </button>
          </>
        ) : (
          <Link to="/register" className="btn">
            Sign up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
