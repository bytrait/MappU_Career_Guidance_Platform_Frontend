// src/components/ProtectedRoute.jsx

import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthAPI from "../services/authAxiosInstance";
import API from "../services/axiosInstance";

function ProtectedRoute({ children, roles }) {
  const location = useLocation();

  const [authState, setAuthState] = useState({
    loading: true,
    isAuthenticated: false,
    user: null,
    paymentAllowed: true,
    paymentStatusLoaded: false,
  });

  const ROLE_HOME = {
    STUDENT: "/",
    COUNSELLOR: "/counsellor/dashboard",
  };

  const PAYMENT_EXEMPT_PATHS = [
    "/payment",
  ];

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authRes = await AuthAPI.get("/auth/isAuthenticated");

        const user = authRes.data.data;

        let paymentAllowed = true;

        // IMPORTANT:
        // only check payment when user is student
        if (user.role === "STUDENT") {
          try {
            const paymentRes = await API.get(
              "/billing/student-payment/status"
            );

            const payment = paymentRes.data.data;

            paymentAllowed =
              payment.status === "PAID" ||
              payment.status === "FREE";
          } catch (error) {
            paymentAllowed = false;
          }
        }

        setAuthState({
          loading: false,
          isAuthenticated: true,
          user,
          paymentAllowed,
          paymentStatusLoaded: true,
        });
      } catch (err) {
        setAuthState({
          loading: false,
          isAuthenticated: false,
          user: null,
          paymentAllowed: false,
          paymentStatusLoaded: true,
        });
      }
    };

    checkAuth();
  }, []);

  if (authState.loading || !authState.paymentStatusLoaded) {
    return <p>Loading...</p>;
  }

  if (!authState.isAuthenticated) {
    const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

    const returnTo = encodeURIComponent(
      location.pathname + location.search
    );

    window.location.href = `${redirectUrl}?redirect=${returnTo}`;
    return null;
  }

  if (roles && !roles.includes(authState.user.role)) {
    const redirectPath = ROLE_HOME[authState.user.role] || "/";
    return <Navigate to={redirectPath} replace />;
  }

  const isPaymentPage = location.pathname === "/payment";

  const isPaymentExemptRoute = PAYMENT_EXEMPT_PATHS.some(
    (path) =>
      location.pathname === path ||
      location.pathname.startsWith(path)
  );

  if (
    authState.user.role === "STUDENT" &&
    !authState.paymentAllowed &&
    !isPaymentPage &&
    !isPaymentExemptRoute
  ) {
    return <Navigate to="/payment" replace />;
  }

  if (
    authState.user.role === "STUDENT" &&
    authState.paymentAllowed &&
    isPaymentPage
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;