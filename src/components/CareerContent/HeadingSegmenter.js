import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import { render as renderHtml } from "dom-serializer";

/**
 * Splits HTML into sections based on headings (h1–h4).
 * Each section = { headingHtml: "<i class='bi ...'></i> Title", content: "<p>..</p><ul>..</ul>" }
 */
export function segmentByHeadings(htmlString) {
  if (!htmlString || typeof htmlString !== "string") return [];

  const document = parseDocument(htmlString);
  const children = DomUtils.getChildren(document);
  const sections = [];

  let currentSection = null;

  for (const node of children) {
    if (node.type === "tag" && /^h[1-4]$/i.test(node.name)) {
      // Close previous section
      if (currentSection) sections.push(currentSection);

      // NEW: Preserve inner HTML of heading
      const headingInnerHtml = renderHtml(node.children).trim();

      currentSection = {
        heading: headingInnerHtml,   // <-- HTML preserved, icons included
        content: "",
      };
    } else if (currentSection) {
      currentSection.content += renderHtml(node);
    }
  }

  if (currentSection) sections.push(currentSection);

  return sections;
}
