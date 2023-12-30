window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "get-local-storage") {
    let localStorage = window.localStorage;
    sendResponse(localStorage);
    return true;
  } else if (
    typeof message === "object" &&
    message.type === "set-local-storage"
  ) {
    window.localStorage = message.localStorage;
    sendResponse(`Successfully set localStorage for ${window.location.href}`);
    window.location.reload();
    return true;
  }
});

window.chrome.runtime.sendMessage("check-for-local-storage");
