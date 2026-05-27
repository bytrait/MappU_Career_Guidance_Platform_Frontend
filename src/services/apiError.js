/**
 * Normalized API error shape used everywhere we talk to the backend.
 *
 *   {
 *     status:  number,        // HTTP status (0 when the request never reached the server)
 *     message: string,        // Human-readable, render verbatim
 *     code:    string | null, // Machine code from the envelope, e.g. CODE_IN_USE
 *     details: unknown | null // Server-supplied validation details, if any
 *   }
 *
 * Components branch on `status` first, then `code`, and use `message` as the
 * last-resort fallback. Do NOT match free-form English in product code.
 */

export const ERROR_CODES = Object.freeze({
  CODE_REQUIRED: "CODE_REQUIRED",
  CODE_FORMAT_INVALID: "CODE_FORMAT_INVALID",
  CODE_IN_USE: "CODE_IN_USE",
  UNIQUE_VIOLATION: "UNIQUE_VIOLATION",
  NOT_FOUND: "NOT_FOUND",
});

export class ApiError extends Error {
  constructor({ status, message, code = null, details = null, cause } = {}) {
    super(message || "Something went wrong, please try again.");
    this.name = "ApiError";
    this.status = typeof status === "number" ? status : 0;
    this.code = code || null;
    this.details = details || null;
    if (cause) this.cause = cause;
  }
}

const DEFAULT_5XX = "Something went wrong, please try again.";
const DEFAULT_NETWORK =
  "Couldn't reach the server. Check your connection and try again.";

/**
 * Convert any axios error (or anything thrown by an axios call) into an
 * ApiError. Safe to call with a non-axios error too — it'll just become a
 * generic 0-status ApiError.
 */
export const normalizeApiError = (err) => {
  if (err instanceof ApiError) return err;

  const response = err?.response;
  const data = response?.data;
  const status = response?.status ?? 0;

  // Server-sent envelope: { success: false, message, code?, details? }
  if (data && typeof data === "object" && data.success === false) {
    return new ApiError({
      status,
      message: data.message || DEFAULT_5XX,
      code: data.code || null,
      details: data.details ?? null,
      cause: err,
    });
  }

  // Server replied but with a different shape — best-effort fallback.
  if (response) {
    const message =
      (data && typeof data === "object" && data.message) ||
      (typeof data === "string" && data) ||
      (status >= 500 ? DEFAULT_5XX : err?.message) ||
      DEFAULT_5XX;
    return new ApiError({
      status,
      message,
      code: (data && data.code) || null,
      details: (data && data.details) ?? null,
      cause: err,
    });
  }

  // Request never made it to the server (network error / CORS / aborted).
  return new ApiError({
    status: 0,
    message: err?.message ? `${DEFAULT_NETWORK} (${err.message})` : DEFAULT_NETWORK,
    cause: err,
  });
};

export const isApiError = (x) => x instanceof ApiError;
