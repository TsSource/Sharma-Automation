import { CALENDLY_URL } from "../config/contact";

/* ═══════════════════════════════════════════════════════════════
   CALENDLY POPUP (Wave SITE-FORMS-1)

   Opens the booking calendar as an overlay so the visitor never
   leaves the site. Calendly's widget assets are fetched on the
   first click, not on page load, and at most once per page.

   Fail-safe: content blockers routinely kill third-party widget
   scripts. If the script errors, or window.Calendly has still not
   appeared when the timeout expires, the calendar opens in a new
   tab instead. A visitor always ends up able to book.
═══════════════════════════════════════════════════════════════ */

const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";
const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";

const CSS_SELECTOR = `link[data-calendly-widget="css"]`;
const JS_SELECTOR = `script[data-calendly-widget="js"]`;

/* How long to wait for the widget script before falling back. */
export const READY_TIMEOUT_MS = 4000;
const POLL_INTERVAL_MS = 100;

const isReady = () =>
  typeof window.Calendly?.initPopupWidget === "function";

const openPopup = () => {
  window.Calendly.initPopupWidget({ url: CALENDLY_URL });
};

const openInNewTab = () => {
  window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
};

const ensureStylesheet = () => {
  if (document.querySelector(CSS_SELECTOR)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = WIDGET_CSS;
  link.setAttribute("data-calendly-widget", "css");
  document.head.appendChild(link);
};

const ensureScript = () => {
  if (document.querySelector(JS_SELECTOR)) return;
  const script = document.createElement("script");
  script.src = WIDGET_JS;
  script.async = true;
  script.setAttribute("data-calendly-widget", "js");
  /* Marked rather than removed: a blocked script must not be
     re-requested on every click, and the poll below reads this. */
  script.onerror = () => { script.setAttribute("data-calendly-failed", "true"); };
  document.body.appendChild(script);
};

const scriptFailed = () =>
  document.querySelector(JS_SELECTOR)?.getAttribute("data-calendly-failed") === "true";

export function openCalendlyPopup() {
  if (isReady()) { openPopup(); return; }

  ensureStylesheet();
  ensureScript();

  const deadline = Date.now() + READY_TIMEOUT_MS;
  const timer = setInterval(() => {
    if (isReady()) { clearInterval(timer); openPopup(); return; }
    if (scriptFailed() || Date.now() >= deadline) { clearInterval(timer); openInNewTab(); }
  }, POLL_INTERVAL_MS);
}
