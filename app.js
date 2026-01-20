let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.addEventListener("click", async () => {
  installBtn.hidden = true;
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Install choice:", outcome);
    deferredPrompt = null;
  
  }
});

// Service worker registreren
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/pwa-app/sw.js")
    .then(() => console.log("Service Worker geregistreerd"))
    .catch(err => console.error("Service Worker fout:", err));
}

