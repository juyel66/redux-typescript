// src/App.tsx
import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "./features/authSlice";


import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(loadCurrentUser());
    }

  }, [dispatch, token, user]);

  return <RouterProvider router={router} />;
}

export default App;
