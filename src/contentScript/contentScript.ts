// Add a listener for messages sent to the background script from other parts of the extension
window.chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  
  // Check if the received message is "get-local-storage"
  if (message === "get-local-storage") {
    // Get the current localStorage object
    let localStorage = window.localStorage;
    
    // Send the localStorage object back to the sender
    sendResponse(localStorage);
    
    // Return true to indicate that the response will be sent asynchronously
    return true;
    
  } else if (
    // Check if the message is an object and has a type of "set-local-storage"
    typeof message === "object" &&
    message.type === "set-local-storage"
  ) {
    // Set the localStorage to the new value provided in the message
    window.localStorage = message.localStorage;
    
    // Send a success message back to the sender
    sendResponse(`Successfully set localStorage for ${window.location.href}`);
    
    // Reload the current page to apply the new localStorage settings
    window.location.reload();
    
    // Return true to indicate that the response will be sent asynchronously
    return true;
  }
});

// Send a message to check for localStorage status or availability
window.chrome.runtime.sendMessage("check-for-local-storage");
