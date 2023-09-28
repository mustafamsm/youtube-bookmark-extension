//when the tab is updated, check if the url is a youtube video
chrome.tabs.onUpdated.addListener( (tabId, tab)=> {
  // read changeInfo data and do something with it (like read the url)
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParam = tab.url.split("?")[1];
    const urlParamter = new URLSearchParams(queryParam);
   
  //send a message to the content script 
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParamter.get("v"),
    });
  }
});


