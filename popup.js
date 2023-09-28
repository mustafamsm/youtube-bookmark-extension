import { getActiveTabUrl } from "./utils.js";
// adding a new bookmark row to the popup
const addNewBookmark = (bookmarkEslment, bookmark) => {
  const bookmarkTitleElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");

  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";

  newBookmarkElement.id = "bookmark-" + bookmark.time;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute('timestamp',bookmark.time);
  newBookmarkElement.appendChild(bookmarkTitleElement);
  bookmarkEslment.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentVideoBookmarks = []) => {
  const bookmarkEslment = document.getElementById("bookmarks")[0];
  bookmarkEslment.innerHTML = "";
  if (currentVideoBookmarks.length > 0) {
    for (let i = 0; i < currentVideoBookmarks.length; i++) {
      const bookmark = currentVideoBookmarks[i];
      addNewBookmark(bookmarkEslment, bookmark);
    }
  } else {
    bookmarkEslment.innerHTML = "<i class='row'>No bookmarks found.</i>";
  }
};

const onPlay = (e) => {};

const onDelete = (e) => {};

const setBookmarkAttributes = (src,eventListener,controlParentElemnt) => {};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabUrl();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);
  const currentVideo = urlParameters.get("v");
  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];
      //view bookmarks
      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];
    container.innerHTML =
      "<div class='title'>This is not a youtube video page.</div>";
  }
});
