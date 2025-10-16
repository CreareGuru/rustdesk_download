# 🦀 RustDesk Dynamic Download Page Snippet

A lightweight HTML + JavaScript snippet that automatically displays the **latest RustDesk release downloads** for all supported operating systems and architectures — directly from the [RustDesk GitHub releases](https://github.com/rustdesk/rustdesk/releases).

This snippet **stays up to date automatically** with each new RustDesk version. No manual updates required!  

---

## ✨ Features

✅ Fetches the **latest release** info from the GitHub API  
✅ Dynamically lists **all download files** for:

- Windows  
- macOS  
- Linux  
- Android  
- iOS  
- Other (miscellaneous builds)  

✅ Highlights downloads that **match the user’s OS and architecture** as "Recommended for you"  
✅ Adds **friendly architecture labels** (e.g., 64-bit Intel, Apple Silicon M1/M2)  
✅ Includes **macOS permission notes** and **iOS limitations**  
✅ Works in any **HTML page**, **WordPress Custom HTML block**, or **static site**  
✅ Lightweight, modern layout  

---

## 💻 macOS and iOS Notes

- **macOS:** After installing RustDesk, enable the following for full functionality:
  1. System Settings → Privacy & Security → Accessibility  
  2. System Settings → Privacy & Security → Screen and System Audio Recording  

- **iOS:** RustDesk allows you to connect to and control other devices, but **iOS devices cannot be controlled remotely** using RustDesk. The app is available on the App Store:  
[RustDesk on the App Store](https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015)  

---

## 🧩 Live Preview

You can see the dynamic snippet in action below. It fetches the latest RustDesk release from GitHub:

[View live demo](https://CreareGuru.github.io/rustdesk_download/demo.html)


> The snippet automatically populates all OS sections with the latest release files.

---

## 💻 Installation / Usage

Copy and paste this snippet into your webpage:

```html
<section id="rustdesk-downloads" style="font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px;">
  <h2 style="font-size: 2em; margin-bottom: 0.5em;">Download RustDesk</h2>
  <p id="release-info" style="margin-bottom: 1.5em;">Fetching the latest release...</p>
  <div id="downloads"></div>
</section>

<script src="https://cdn.jsdelivr.net/gh/CreareGuru/rustdesk_download@main/rustdesk-download.js"></script>
```
Any updates pushed to rustdesk-download.js on GitHub automatically reflect on your site via jsDelivr.

## 🧠 How It Works

Uses GitHub REST API:
https://api.github.com/repos/rustdesk/rustdesk/releases/latest

Reads all downloadable assets in the latest release

Groups files by OS and architecture

Adds labels and highlights recommended downloads

Renders macOS permission notes and iOS limitations dynamically

## 🧱 Integration Tips

Works in WordPress, static HTML, or any CMS

Styling can be adjusted with CSS for a seamless look

Optional caching recommended if your site has heavy traffic (GitHub API rate limits anonymous requests)

## 📜 License

MIT License

## 💡 Author

Built with ❤️ by Wynand Nel / Creare.Guru


---
