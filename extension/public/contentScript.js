// contentScript.js

// Get local storage data
// const localStorageData = localStorage.getItem('your_key');

// Get cookies
const cookies = document.cookie;

// Send the data back to the background script
chrome.runtime.sendMessage({
  type: 'tabData',
  payload: {
    cookies,
  },
});
