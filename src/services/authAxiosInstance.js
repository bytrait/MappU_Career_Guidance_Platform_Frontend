// src/services/authAxiosInstance.js
import axios from "axios";
import { toast } from "sonner";

import { normalizeApiError } from "./apiError";

const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Module-level guards prevent toast/redirect spam when a burst of parallel
// requests all fail with the same global error (very common with Promise.all
// over per-school list calls).
let sessionExpiredHandled = false;
let lastForbiddenToastAt = 0;
let lastServerErrorToastAt = 0;
const TOAST_DEDUP_MS = 2000;

/**
 * Side-effect dispatcher for global HTTP error classes. Returns true when
 * the side-effect "owned" the user-facing notification, so the caller's
 * catch block doesn't double-toast.
 *
 * - 401 → bounce to the configured login redirect (same pattern as
 *         ProtectedRoute), except for the very auth-check itself which
 *         ProtectedRoute already handles silently. Idempotent — a burst of
 *         401s only triggers one redirect.
 * - 403 → toast "no access"; don't redirect (no dedicated forbidden page).
 * - 5xx → toast a generic message — never leak the raw server text/stack.
 *
 * 400 / 404 / 409 are left for the component to render inline.
 */
const handleGlobalErrorSideEffects = (apiError, requestUrl = "") => {
  const url = requestUrl || "";

  if (apiError.status === 401) {
    // Don't redirect on the auth-check call itself — ProtectedRoute relies on
    // that promise rejecting cleanly so it can choose where to send the user.
    if (url.includes("/auth/isAuthenticated")) return false;
    if (sessionExpiredHandled) return true;
    sessionExpiredHandled = true;

    const redirectUrl = import.meta.env.VITE_REDIRECT_URL || "/";
    const returnTo = encodeURIComponent(
      window.location.pathname + window.location.search
    );

    toast.error("Your session expired. Please sign in again.");
    window.location.href = `${redirectUrl}?redirect=${returnTo}`;
    return true;
  }

  if (apiError.status === 403) {
    const now = Date.now();
    if (now - lastForbiddenToastAt > TOAST_DEDUP_MS) {
      lastForbiddenToastAt = now;
      toast.error(apiError.message || "You don't have access to that.");
    }
    return true;
  }

  if (apiError.status >= 500) {
    const now = Date.now();
    if (now - lastServerErrorToastAt > TOAST_DEDUP_MS) {
      lastServerErrorToastAt = now;
      toast.error("Something went wrong, please try again.");
    }
    if (import.meta.env.DEV) {
      console.error("[AuthAPI 5xx]", apiError.message, apiError);
    }
    return true;
  }

  return false;
};

AuthAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError = normalizeApiError(error);

    // Stash the normalized error on the original axios error so legacy code
    // that reads `error?.response?.data?.message` keeps working, AND new code
    // can read `error.api` to branch on status/code.
    if (error && typeof error === "object") {
      error.api = apiError;
    }

    handleGlobalErrorSideEffects(apiError, error?.config?.url);

    return Promise.reject(error);
  }
);

export default AuthAPI;
