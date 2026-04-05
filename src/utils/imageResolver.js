// src/utils/imageResolver.js

/**
 * Glob import all assets inside src/assets
 * Works in Vite dev and production.
 */
const imageMap = import.meta.glob("/src/assets/**/*.{png,jpg,jpeg,svg,webp}", {
  eager: true,
});

/**
 * Resolve DB image path like:
 *   "src/assets/Aptitude/MR/MR2.png"
 * into actual Vite URL.
 *
 * @param {string} relativePath - Raw DB path after "img:"
 * @returns {string|null}
 */
export function resolveImage(relativePath) {
  if (!relativePath) return null;

  // Ensure no leading slash (DB can vary)
  const normalized = relativePath.replace(/^\//, "");

  // Vite uses absolute keys starting with "/"
  const key = "/" + normalized;

  const asset = imageMap[key];

  if (!asset) {
    console.warn(`⚠️ Image not found: ${key}`);
    return null;
  }

  // asset is { default: "final-hashed-url.png" }
  return asset.default;
}
