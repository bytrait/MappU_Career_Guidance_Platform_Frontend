export function setFavicon(faviconUrl) {
  let link = document.querySelector("link[rel~='icon']")

  if (!link) {
    link = document.createElement("link")
    link.rel = "icon"
    document.head.appendChild(link)
  }

  link.href = faviconUrl
}