export function setFavicon(faviconUrl) {
  if (!faviconUrl) return

  document
    .querySelectorAll(
      "link[rel='icon'], link[rel='shortcut icon'], link[rel*='icon']"
    )
    .forEach((node) => node.remove())

  const link = document.createElement("link")
  link.rel = "icon"
  link.href = faviconUrl
  if (faviconUrl.endsWith(".svg")) link.type = "image/svg+xml"
  document.head.appendChild(link)

  const apple = document.createElement("link")
  apple.rel = "apple-touch-icon"
  apple.href = faviconUrl
  document.head.appendChild(apple)
}
