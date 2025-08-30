// src/features/useAuth.ts
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentUser } from "./authSlice";
import Cookies from "js-cookie";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isAuthenticated } = useSelector(
    (state: any) => state.auth
  );

  useEffect(() => {
    // যদি accessToken থাকে কিন্তু user null হয়, তাহলে current user load করো
    const cookieToken = Cookies.get("accessToken");
    if (cookieToken && !user) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch, user]);

  return { user, isLoading, isAuthenticated };
};
