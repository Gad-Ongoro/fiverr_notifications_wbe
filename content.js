// === ACCOUNT NAME ===
function getFiverrUsername() {
  const url = window.location.href;
  const match = url.match(/fiverr\.com\/users\/([^\/?#]+)/i);
  return match ? match[1] : "Unknown User";
}

// === CHECK FOR NEW MESSAGE NOTIFICATION ===
function checkForNewMessageNotification() {
  const notificationIcon = document.querySelector(".unread-icon");
  if (notificationIcon) {
    const username = getFiverrUsername();
    chrome.runtime.sendMessage({ 
      newMessage: true,
      username: username
    });
  }
}

// Run every 20 seconds
setInterval(checkForNewMessageNotification, 20000);

// === ALERT SOUND ===
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "playSound") {
    playAlertSound();
  }
});

function playAlertSound() {
  const audio = new Audio(chrome.runtime.getURL("sounds/notification.mp3"));
  audio.loop = false;
  audio.play().catch((e) => console.error("Audio play failed:", e));

  // const utterance = new SpeechSynthesisUtterance(`New message on Fiverr account ${username}`);
  // speechSynthesis.speak(utterance);
}
