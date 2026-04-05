/**
 * Removes markdown code fences (markdown-style code blocks)
 * Example patterns removed:
 *   - triple-backtick + html
 *   - triple-backtick alone
 */
export function cleanHtmlContent(html = "") {
  if (!html) return "";

  return html
    // remove opening markdown fence (```html or ```)
    .replace(/`{3}html\s*/gi, "")
    .replace(/`{3}\s*/g, "")
    .trim();
}
