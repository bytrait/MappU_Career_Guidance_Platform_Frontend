import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";

import { getReferenceTokenPricesBatch } from "../../services/billingService";
import {
  listCounsellorTokens,
  listSchoolTokens,
  deactivateToken,
} from "../../services/counsellorService";
import {
  bucketTokenApiError,
  formatDate,
  formatTokenPrice,
  formatValidWindow,
  getStatusPresentation,
  getTokenStatus,
  mergeTokensWithPrices,
} from "../../utils/referenceTokens";
import CreateTokenModal from "./CreateTokenModal";
import ExtendTokenModal from "./ExtendTokenModal";
import EditPriceModal from "./EditPriceModal";

const SKELETON_ROWS = 3;
const TABLE_COLS = 7;
const DEV_MODE = import.meta?.env?.DEV;

const StatusPill = ({ status }) => {
  const { label, pill } = getStatusPresentation(status);
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${pill}`}
    >
      {label}
    </span>
  );
};

const CodePill = ({ code }) => (
  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-mono text-sm tracking-wider">
    {code}
  </span>
);

const SkeletonRow = () => (
  <tr className="border-b border-slate-100 animate-pulse">
    {Array.from({ length: TABLE_COLS }).map((_, i) => (
      <td key={i} className="py-4 px-4">
        <div className="h-3 bg-slate-100 rounded w-24" />
      </td>
    ))}
  </tr>
);

const EmptyState = ({ onGenerate }) => (
  <div className="py-14 px-6 text-center">
    <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-indigo-50 flex items-center justify-center">
      <span className="text-2xl" aria-hidden>
        🎟️
      </span>
    </div>
    <h3 className="text-base font-semibold text-slate-800">
      No tokens yet
    </h3>
    <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
      Generate one to start onboarding students.
    </p>
    {onGenerate && (
      <button
        type="button"
        onClick={onGenerate}
        className="mt-5 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
      >
        + Generate new token
      </button>
    )}
  </div>
);

const ErrorBanner = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
    <p className="text-sm">{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
      >
        Retry
      </button>
    )}
  </div>
);

const MENU_WIDTH = 192;
const VIEWPORT_PAD = 8;

/**
 * Kebab menu rendered in a portal so it is not clipped by table overflow.
 */
const PortalActionMenu = ({
  open,
  onOpenChange,
  triggerRef,
  menuRef,
  align = "right",
  menuWidth = MENU_WIDTH,
  children,
  triggerLabel,
  triggerClassName,
}) => {
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight ?? 0;
    const gap = 4;

    let top = rect.bottom + gap;
    if (menuHeight && top + menuHeight > window.innerHeight - VIEWPORT_PAD) {
      top = Math.max(VIEWPORT_PAD, rect.top - gap - menuHeight);
    }

    let left =
      align === "right" ? rect.right - menuWidth : rect.left;
    left = Math.max(
      VIEWPORT_PAD,
      Math.min(left, window.innerWidth - menuWidth - VIEWPORT_PAD)
    );

    setCoords({ top, left });
  }, [align, menuRef, menuWidth, triggerRef]);

  useLayoutEffect(() => {
    if (!open) return undefined;
    updatePosition();
    const raf = requestAnimationFrame(() => updatePosition());
    const onScrollOrResize = () => updatePosition();
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("scroll", onScrollOrResize, true);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("scroll", onScrollOrResize, true);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return undefined;
    const onDocClick = (e) => {
      const target = e.target;
      if (
        triggerRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      onOpenChange(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, menuRef, onOpenChange, triggerRef]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => onOpenChange(!open)}
        className={triggerClassName}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={triggerLabel}
      >
        <span aria-hidden>⋯</span>
      </button>
      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              width: menuWidth,
              zIndex: 9999,
            }}
            className="bg-white rounded-xl shadow-lg border border-slate-200 py-1"
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};

const RowActionsMenu = ({ items }) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  return (
    <div className="inline-block">
      <PortalActionMenu
        open={open}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
        menuRef={menuRef}
        triggerLabel="Token actions"
        triggerClassName="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
      >
        {items.map((item, i) =>
          item.divider ? (
            <div key={`div-${i}`} className="border-t border-slate-100 my-1" />
          ) : (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                setOpen(false);
                item.onClick?.();
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 disabled:text-slate-400 disabled:hover:bg-transparent ${
                item.destructive ? "text-red-600" : "text-slate-700"
              }`}
            >
              {item.label}
            </button>
          )
        )}
      </PortalActionMenu>
    </div>
  );
};

/**
 * Reference tokens table — works for both counsellor and school scopes.
 *
 * Props:
 *  - scope: 'counsellor' | 'school'
 *  - schoolId?: string                     (required when scope === 'school')
 *  - title?: string
 *  - description?: string
 *  - legacyMenu?: ReactNode                (rendered in the kebab menu)
 *  - onActiveCountChange?: (n) => void
 */
const TokensTable = ({
  scope = "counsellor",
  schoolId,
  title = "My Reference Tokens",
  description = "Generate and manage tokens for onboarding students.",
  legacyMenu,
  onActiveCountChange,
}) => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showInactive, setShowInactive] = useState(false);

  const [createOpen, setCreateOpen] = useState(false);
  const [extendTarget, setExtendTarget] = useState(null);
  const [priceTarget, setPriceTarget] = useState(null);
  const [deactivateTarget, setDeactivateTarget] = useState(null);
  const [deactivating, setDeactivating] = useState(false);
  const [kebabOpen, setKebabOpen] = useState(false);
  const legacyTriggerRef = useRef(null);
  const legacyMenuRef = useRef(null);

  const fetchTokens = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data =
        scope === "school"
          ? await listSchoolTokens(schoolId, { includeInactive: true })
          : await listCounsellorTokens({ includeInactive: true });
      const rows = Array.isArray(data) ? data : [];

      if (rows.length > 0) {
        try {
          const priceRows = await getReferenceTokenPricesBatch(
            rows.map((t) => t.id)
          );
          setTokens(mergeTokensWithPrices(rows, priceRows));
        } catch {
          setTokens(rows);
        }
      } else {
        setTokens([]);
      }
    } catch (err) {
      const bucket = bucketTokenApiError(err);
      if (bucket.silent) return; // global toast already shown
      setError(bucket.message || bucket.toast || bucket.form || "Couldn't load tokens.");
    } finally {
      setLoading(false);
    }
  }, [scope, schoolId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  // Always fetch with includeInactive=true and filter client-side so the
  // toggle is instant and we don't re-hit the API on every flip.
  const visibleTokens = useMemo(() => {
    const now = new Date();
    return tokens
      .filter((t) => {
        const status = getTokenStatus(t, now);
        if (showInactive) return true;
        return status === "ACTIVE" || status === "SCHEDULED";
      })
      .sort((a, b) => {
        const ad = new Date(a.createdAt).getTime();
        const bd = new Date(b.createdAt).getTime();
        return bd - ad;
      });
  }, [tokens, showInactive]);

  const activeCount = useMemo(() => {
    const now = new Date();
    return tokens.reduce(
      (acc, t) => (getTokenStatus(t, now) === "ACTIVE" ? acc + 1 : acc),
      0
    );
  }, [tokens]);

  useEffect(() => {
    onActiveCountChange?.(activeCount);
  }, [activeCount, onActiveCountChange]);

  const handleCopy = async (token) => {
    try {
      await navigator.clipboard.writeText(token.code);
      toast.success("Copied");
    } catch {
      toast.error("Couldn't copy to clipboard");
    }
  };

  const handleCreated = (token) => {
    setTokens((prev) => [token, ...prev.filter((t) => t.id !== token.id)]);
    fetchTokens();
  };

  /**
   * Extend response is the AUTHORITATIVE state of the token after the
   * mutation — including the case where billing failed and the backend
   * rolled back the expiryDate change. We never optimistically retain the
   * date the user typed.
   */
  const handleExtended = (token) => {
    setTokens((prev) =>
      prev.map((t) => (t.id === token.id ? { ...t, ...token } : t))
    );
  };

  const handlePriceUpdated = (response) => {
    if (!response?.tokenId) return;
    setTokens((prev) =>
      prev.map((t) =>
        t.id === response.tokenId
          ? {
              ...t,
              price: response.price ?? t.price,
              currency: response.currency || t.currency,
            }
          : t
      )
    );
  };

  const handleConfirmDeactivate = async () => {
    if (!deactivateTarget) return;
    try {
      setDeactivating(true);
      const updated = await deactivateToken(deactivateTarget.id);
      setTokens((prev) =>
        prev.map((t) =>
          t.id === deactivateTarget.id
            ? { ...t, ...updated, isActive: false }
            : t
        )
      );
      toast.success("Token deactivated");
      setDeactivateTarget(null);
    } catch (err) {
      const bucket = bucketTokenApiError(err);
      if (bucket.silent) {
        setDeactivateTarget(null);
        return;
      }
      toast.error(bucket.message || bucket.form || "Failed to deactivate token.");
    } finally {
      setDeactivating(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-slate-100 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            Show inactive
          </label>

          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition text-sm font-medium"
          >
            + Generate new token
          </button>

          {legacyMenu && (
            <PortalActionMenu
              open={kebabOpen}
              onOpenChange={setKebabOpen}
              triggerRef={legacyTriggerRef}
              menuRef={legacyMenuRef}
              menuWidth={256}
              triggerLabel="More actions"
              triggerClassName="h-9 w-9 inline-flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              {legacyMenu}
            </PortalActionMenu>
          )}
        </div>
      </div>

      {error && (
        <div className="px-6 py-4">
          <ErrorBanner message={error} onRetry={fetchTokens} />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Code
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Label
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Price
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Valid window
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
              <th className="py-3 px-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: SKELETON_ROWS }).map((_, i) => (
                <SkeletonRow key={i} />
              ))
            ) : visibleTokens.length === 0 ? (
              <tr>
                <td colSpan={TABLE_COLS}>
                  <EmptyState onGenerate={() => setCreateOpen(true)} />
                </td>
              </tr>
            ) : (
              visibleTokens.map((token) => {
                const status = getTokenStatus(token);
                const dim = status === "EXPIRED" || status === "INACTIVE";
                return (
                  <tr
                    key={token.id}
                    className={`border-b border-slate-100 transition ${
                      dim ? "opacity-60" : ""
                    }`}
                  >
                    <td className="py-3 px-4 align-top">
                      <div className="flex items-start gap-2">
                        <CodePill code={token.code} />
                        <button
                          type="button"
                          onClick={() => handleCopy(token)}
                          className="h-8 w-8 shrink-0 inline-flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-indigo-600"
                          aria-label={`Copy code ${token.code}`}
                          title="Copy code"
                        >
                          <Copy className="h-4 w-4" aria-hidden />
                        </button>
                      </div>
                      {DEV_MODE && (
                        <div className="text-[10px] font-mono text-slate-400 mt-1">
                          {token.id}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 align-top text-slate-700">
                      {token.label || (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 align-top">
                      <StatusPill status={status} />
                    </td>
                    <td className="py-3 px-4 align-top text-slate-700 text-sm">
                      {formatTokenPrice(token.price, token.currency)}
                    </td>
                    <td className="py-3 px-4 align-top text-slate-700">
                      {formatValidWindow(token)}
                    </td>
                    <td className="py-3 px-4 align-top text-slate-500 text-sm">
                      {formatDate(token.createdAt)}
                    </td>
                    <td className="py-3 px-4 align-top text-right">
                      <RowActionsMenu
                        items={[
                          {
                            label: "Edit price",
                            onClick: () => setPriceTarget(token),
                          },
                          {
                            label: "Extend",
                            onClick: () => setExtendTarget(token),
                          },
                          { divider: true },
                          {
                            label: "Deactivate",
                            destructive: true,
                            disabled: !token.isActive,
                            onClick: () => setDeactivateTarget(token),
                          },
                        ]}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <CreateTokenModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={handleCreated}
        scope={scope}
        schoolId={schoolId}
      />

      <ExtendTokenModal
        open={Boolean(extendTarget)}
        token={extendTarget}
        onClose={() => setExtendTarget(null)}
        onExtended={handleExtended}
      />

      <EditPriceModal
        open={Boolean(priceTarget)}
        token={priceTarget}
        onClose={() => setPriceTarget(null)}
        onUpdated={handlePriceUpdated}
      />

      {deactivateTarget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">
              Deactivate token?
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Token{" "}
              <span className="font-mono font-semibold text-slate-800">
                {deactivateTarget.code}
              </span>{" "}
              will stop accepting new student signups. You can re-activate it
              later by extending its expiry.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeactivateTarget(null)}
                disabled={deactivating}
                className="px-4 py-2 border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeactivate}
                disabled={deactivating}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50"
              >
                {deactivating ? "Deactivating…" : "Deactivate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokensTable;
