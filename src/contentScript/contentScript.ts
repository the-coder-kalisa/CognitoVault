window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "get-local-storage") {
    let localStorage = window.localStorage;
    sendResponse(localStorage);
    return true;
  } else if (message === "set-data") {
    const { localStorage, cookies } = message;
    // await chrome.storage.local.set(localStorage);
    // cookies.forEach((cookie: chrome.cookies.Cookie & { url: string }) => {
    //   chrome.cookies.set({
    //     ...cookie,
    //   });
    // });
  }
});
