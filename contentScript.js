(() => {
  let youtubeLeftControls, youtubePlayer;
  let currentVideo = "";
  let currentVideoBookmarks = [];

  //listen for messages from the background script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    //check if the message is of type NEW
    const { type, value, videoId } = message;
    if (type == "NEW") {
        //set the current video id
        currentVideo = videoId;
        newVideoLoaded();
    }
  });

  const newVideoLoaded =async () => {
    const bookmarkBtnExists= document.getElementsByClassName("bookmark-btn")[0];
    if(!bookmarkBtnExists){
        const bookmarkBtn=document.createElement("img");

        bookmarkBtn.src=chrome.runtime.getURL("assets/bookmark.png");
        bookmarkBtn.className='ytp-button '+"bookmark-btn";
        bookmarkBtn.title="Click to bookmark current timestamp";

        youtubeLeftControls=document.getElementsByClassName("ytp-left-controls")[0];
        youtubePlayer=document.getElementsByClassName("video-stream")[0];

        youtubeLeftControls.appendChild(bookmarkBtn);

        bookmarkBtn.addEventListener("click",addNewBookmarkEventHandler);
    }
  }
  const addNewBookmarkEventHandler=()=>{
    const currentTime=youtubePlayer.currentTime;
    const newBookmark={
        time:currentTime,
        desc:"Bookmarl at "+getTime(currentTime)+""
    };
    console.log(newBookmark);
    chrome.storage.sync.set({
        [currentVideo]:JSON.stringify(...currentVideoBookmarks,newBookmark).sort((a,b)=>a.time-b.time)
    })
}
   

  newVideoLoaded();

})();
const getTime=(time)=>{
    var date=new Date(0);
    date.setSeconds(time);
    return date.toISOString().substr(11,8);
}