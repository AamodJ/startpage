/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"GFNIqIHqnt5lmWGn","label":"social","bookmarks":[{"id":"8xQ16Y0BjU7gTopy","label":"whatsapp","url":"https://web.whatsapp.com"},{"id":"Xn4nFPGsdOCTzWUS","label":"r/unixporn","url":"https://www.reddit.com/r/unixporn"}]},{"id":"7dlrIM2iNXOaAYAL","label":"work","bookmarks":[{"id":"MLlUH6L7KANeUIdl","label":"dotfiles","url":"https://www.github.com/AamodJ/dotfiles"},{"id":"5jQM3TyQN0HrInzC","label":"nextleap","url":"https://nextleap.app/course-dashboard/nlcfs9ep2s3ynbi4xw9hq/overview"},{"id":"FKWtrTLFBXLY5gnv","label":"gmail","url":"https://mail.google.com/mail/u/1/#inbox"}]},{"id":"LL6GY1bx8RH5lX2l","label":"media","bookmarks":[{"id":"p4PCDHtLxJXi4e15","label":"youtube","url":"https://www.youtube.com"},{"id":"18gIEWAvhZQFf0pn","label":"music","url":"https://www.youtube.com/watch?v=uFGqqEFcHTI&list=RDuFGqqEFcHTI&start_radio=1"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
