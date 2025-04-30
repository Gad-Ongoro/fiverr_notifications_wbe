// === FIVERR MESSAGE NOTIFICATION ===
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.newMessage && request.username) {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icons/icon128.png",
      title: "New Fiverr Message!",
      message: `New message on Fiverr account: ${request.username}`,
      priority: 2,
    });

    // additional sound notification ~ MANUAL SETTING (Notification, Sound)
    chrome.tabs.query({ url: "*://www.fiverr.com/users/*" }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, {
          type: "playSound",
          username: request.username,
        });
      });
    });
  }
});


// === AUTOMATIC PAGE REFRESHER ===

// chrome.alarms.create("refreshPage", { periodInMinutes: 3 });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "refreshPage") {
//     chrome.tabs.query({ url: "https://www.fiverr.com/*" }, (tabs) => {
//       tabs.forEach((tab) => {
//         chrome.scripting.executeScript({
//           target: { tabId: tab.id },
//           function: () => location.reload()
//         });
//       });
//     });
//   }
// });
