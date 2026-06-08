import { ERROR_CODES } from "../services/apiError";

/**
 * @typedef {import('../services/counsellorService').ReferenceToken} ReferenceToken
 */

/**
 * Derive a token's effective status from its dates + isActive flag.
 *
 * Precedence (matches the backend / spec):
 *   INACTIVE  > SCHEDULED > EXPIRED > ACTIVE
 *
 * A deactivated token always shows INACTIVE — even if its expiry has also
 * passed — because the flag is the source of truth users explicitly set.
 * Extending a token flips `isActive` back on, which is how "re-activates
 * an expired token" works in the UI.
 *
 * @param {ReferenceToken | null | undefined} token
 * @param {Date} [now]
 * @returns {'ACTIVE' | 'EXPIRED' | 'INACTIVE' | 'SCHEDULED'}
 */
export const getTokenStatus = (token, now = new Date()) => {
  if (!token) return "INACTIVE";
  if (!token.isActive) return "INACTIVE";

  const start = token.startDate ? new Date(token.startDate) : null;
  if (start && start.getTime() > now.getTime()) return "SCHEDULED";

  const expiry = token.expiryDate ? new Date(token.expiryDate) : null;
  if (expiry && expiry.getTime() <= now.getTime()) return "EXPIRED";

  return "ACTIVE";
};

const STATUS_STYLES = {
  ACTIVE: {
    label: "Active",
    pill: "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200",
  },
  EXPIRED: {
    label: "Expired",
    pill: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
  },
  INACTIVE: {
    label: "Inactive",
    pill: "bg-red-100 text-red-700 ring-1 ring-red-200",
  },
  SCHEDULED: {
    label: "Scheduled",
    pill: "bg-blue-100 text-blue-700 ring-1 ring-blue-200",
  },
};

export const getStatusPresentation = (status) =>
  STATUS_STYLES[status] || STATUS_STYLES.INACTIVE;

/**
 * Short, locale-aware date — e.g. "Jun 1, 2026".
 * @param {string | Date | null | undefined} value
 */
export const formatDate = (value) => {
  if (!value) return null;
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Pretty validity window string: `Jun 1, 2026 → Dec 31, 2026`
 * or `Jun 1, 2026 → no expiry` when expiry is null.
 * @param {ReferenceToken} token
 */
export const formatValidWindow = (token) => {
  const start = formatDate(token.startDate) ?? "—";
  const end = token.expiryDate ? formatDate(token.expiryDate) : "no expiry";
  return `${start} → ${end}`;
};

/**
 * Display price from auth-enriched list or billing batch merge.
 * @param {number|null|undefined} price
 * @param {string|null|undefined} currency
 */
export const formatTokenPrice = (price, currency = "INR") => {
  if (price == null || price === "") return "—";
  const amount = Number(price);
  if (!Number.isFinite(amount)) return "—";
  const c = (currency || "INR").toUpperCase();
  if (c === "INR") {
    return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  }
  return `${c} ${amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

/**
 * Merge billing price rows onto auth token rows. Auth fields win when already set.
 * @param {ReferenceToken[]} tokens
 * @param {Array<{ tokenId?: string, id?: string, price?: number|null, currency?: string|null }>} priceRows
 */
export const mergeTokensWithPrices = (tokens = [], priceRows = []) => {
  const byId = new Map();
  for (const row of priceRows) {
    const id = row.tokenId ?? row.id;
    if (id) byId.set(id, row);
  }

  return tokens.map((t) => {
    const billing = byId.get(t.id);
    const hasAuthPrice = t.price != null && t.price !== "";
    return {
      ...t,
      price: hasAuthPrice ? t.price : billing?.price ?? t.price ?? null,
      currency: t.currency ?? billing?.currency ?? null,
    };
  });
};

/**
 * Count tokens whose effective status is ACTIVE.
 * Useful for school-list badges.
 * @param {ReferenceToken[]} tokens
 */
export const countActiveTokens = (tokens = []) => {
  const now = new Date();
  return tokens.reduce(
    (acc, t) => (getTokenStatus(t, now) === "ACTIVE" ? acc + 1 : acc),
    0
  );
};

/** Convert a yyyy-mm-dd input value into an ISO timestamp at start-of-day UTC. */
export const dateInputToIso = (value) => {
  if (!value) return undefined;
  const d = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
};

/** Convert a yyyy-mm-dd input value into an ISO timestamp at end-of-day UTC. */
export const dateInputToIsoEndOfDay = (value) => {
  if (!value) return undefined;
  const d = new Date(`${value}T23:59:59.999Z`);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString();
};

/** Today as yyyy-mm-dd in the user's locale — used as the min for date inputs. */
export const todayInputValue = () => {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

/* -----------------------------
   Custom reference-code helpers
----------------------------- */

export const CODE_REGEX = /^[A-Z0-9]{4,20}$/;

/**
 * Normalize what the user typed in a code field — uppercase + strip anything
 * that isn't A-Z / 0-9. Also caps the length at 20 to make the input feel
 * unsubmittable past the limit.
 * @param {string} raw
 */
export const sanitizeCodeInput = (raw = "") =>
  raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 20);

/**
 * Client-side mirror of the backend validation. Returns the same human
 * messages the server uses so the experience is consistent regardless of
 * which side caught the issue.
 * @param {string} code
 * @returns {string} empty string when valid
 */
export const validateCode = (code = "") => {
  const trimmed = code.trim();
  if (!trimmed) return "Reference code is required";
  if (!CODE_REGEX.test(trimmed)) {
    return "Reference code must be 4-20 characters and contain only letters and numbers";
  }
  return "";
};

/**
 * Suggest a memorable-but-random 6-char code, e.g. "SVPM26". Used by the
 * "Suggest" button in the create modal — the user can always edit it.
 * @param {string} [prefix]   3-letter prefix to anchor the suggestion
 */
export const suggestCode = (prefix) => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // skip I/O for legibility
  const digits = "23456789";                    // skip 0/1 for legibility

  let head = (prefix || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  while (head.length < 3) {
    head += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  let tail = "";
  for (let i = 0; i < 3; i += 1) {
    const pool = i === 0 ? alphabet : digits;
    tail += pool[Math.floor(Math.random() * pool.length)];
  }
  return head + tail;
};

/* -----------------------------
   API error bucketing
----------------------------- */

/** Friendly copy for well-known machine codes (spec UX table). */
export const TOKEN_FIELD_MESSAGES = {
  [ERROR_CODES.CODE_IN_USE]: "This code is already taken",
  [ERROR_CODES.CODE_REQUIRED]: "Reference code is required",
  [ERROR_CODES.CODE_FORMAT_INVALID]:
    "Reference code must be 4-20 characters and contain only letters and numbers",
};

/**
 * User-facing message for an inline field error from the API envelope.
 * Prefers friendly copy for known `code` values; otherwise returns server text.
 */
export const getTokenFieldMessage = (machineCode, serverMessage = "") => {
  if (machineCode && TOKEN_FIELD_MESSAGES[machineCode]) {
    return TOKEN_FIELD_MESSAGES[machineCode];
  }
  return serverMessage || "Something went wrong. Please try again.";
};

/**
 * Buckets a token API error into one of:
 *   - { field: 'code',     message }
 *   - { field: 'expiry',   message }
 *   - { field: 'price',    message }
 *   - { field: 'currency', message }
 *   - { silent: true }                          (already toasted by interceptor)
 *   - { toast:  message }                       (billing rollback / generic)
 *   - { form:   message }                       (everything else)
 *
 * Branches on HTTP status FIRST, then on the machine `code` value, then on
 * the message as a last-resort heuristic. Pass either the raw axios error
 * (we'll auto-normalize) or an already-normalized `ApiError`.
 *
 * @param {unknown} error
 */
export const bucketTokenApiError = (error) => {
  // Lazily import to avoid a cycle if this module is bundled before
  // apiError.js. Static import is fine in practice but the lazy form keeps
  // the function safe for test contexts.
  const apiError = error?.status !== undefined
    ? error
    : (error?.api ?? null);

  // Fall through with whatever we can find.
  const status = apiError?.status ?? error?.response?.status ?? 0;
  const code = apiError?.code ?? error?.response?.data?.code ?? null;
  const message =
    apiError?.message ||
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong, please try again.";

  const lower = message.toLowerCase();

  // 401 / 403 — interceptor handles redirect / toast; no duplicate inline UI.
  if (status === 401 || status === 403) {
    return { silent: true };
  }

  // 502 / billing failures — interceptor toasts server `message`; stay silent here.
  if (
    status === 502 ||
    (status >= 500 && lower.includes("billing"))
  ) {
    return { silent: true };
  }

  // Other 5xx — generic toast from interceptor only.
  if (status >= 500) {
    return { silent: true };
  }

  // 409 duplicate code — inline on code field, no toast (acceptance criteria).
  if (status === 409 || code === ERROR_CODES.CODE_IN_USE) {
    return {
      field: "code",
      message: getTokenFieldMessage(
        code || ERROR_CODES.CODE_IN_USE,
        message
      ),
    };
  }

  // Code-related validation → highlight the code field.
  if (
    code === ERROR_CODES.CODE_REQUIRED ||
    code === ERROR_CODES.CODE_FORMAT_INVALID ||
    code === ERROR_CODES.UNIQUE_VIOLATION
  ) {
    return {
      field: "code",
      message: getTokenFieldMessage(code, message),
    };
  }

  // For 404, attribute to the form so the user knows the resource is gone.
  if (status === 404 || code === ERROR_CODES.NOT_FOUND) {
    return { form: message || "Not found." };
  }

  // 400 / 409 with no machine code — fall back to message heuristics.
  if (
    lower.includes("reference code") ||
    lower.includes("already in use")
  ) {
    return {
      field: "code",
      message: getTokenFieldMessage(
        lower.includes("already in use") ? ERROR_CODES.CODE_IN_USE : code,
        message
      ),
    };
  }
  if (lower.includes("expirydate") || lower.includes("expiry date")) {
    return { field: "expiry", message };
  }
  if (lower.includes("startdate") || lower.includes("start date")) {
    return { field: "expiry", message };
  }
  if (lower.includes("currency")) {
    return { field: "currency", message };
  }
  if (lower.includes("billing")) {
    return { toast: message };
  }
  if (lower.includes("price")) {
    return { field: "price", message };
  }

  return { form: message };
};
