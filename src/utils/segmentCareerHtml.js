import { parseDocument } from "htmlparser2";
import { DomUtils } from "htmlparser2";
import { render as renderHtml } from "dom-serializer";

export function segmentCareerHtml(htmlString = "") {
  if (!htmlString || typeof htmlString !== "string") return "";

  const document = parseDocument(htmlString);
  const nodes = DomUtils.getChildren(document);

  let sections = [];
  let currentSection = null;

  for (const node of nodes) {
    // If h3 → start new section
    if (node.type === "tag" && node.name === "h3") {
      // close previous
      if (currentSection) {
        sections.push(currentSection);
      }

      currentSection = {
        content: renderHtml(node), // include the h3 itself
      };
    } else if (currentSection) {
      // append everything until next h3
      currentSection.content += renderHtml(node);
    }
  }

  // push last section
  if (currentSection) {
    sections.push(currentSection);
  }

  // wrap each section in its own card
  return sections
    .map(
      (section) => `
        <div class="career-card">
          ${section.content}
        </div>
      `
    )
    .join("");
}
