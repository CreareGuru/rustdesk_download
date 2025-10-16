# 🦀 RustDesk Dynamic Download Page Snippet

A lightweight HTML + JavaScript snippet that automatically displays the **latest RustDesk release downloads** for all supported operating systems and architectures — directly from the [RustDesk GitHub releases](https://github.com/rustdesk/rustdesk/releases).

This page stays **up to date automatically** with each new RustDesk version.  
No manual updates required!

---

## ✨ Features

✅ Fetches the **latest release** info from the GitHub API  
✅ Dynamically lists **all download files** for:
- 🪟 **Windows**
- 🍎 **macOS**
- 🐧 **Linux**
- 🤖 **Android**
- 📱 **iOS**
- 📦 **Other (miscellaneous builds)**

✅ Automatically updates when a new version is published  
✅ Works in any **HTML page**, **WordPress Custom HTML block**, or **static site**  
✅ Simple, modern layout with emojis and lightweight inline styling

---

## 🧩 Example Screenshot

*(Example output when RustDesk v1.4.2 is the latest release)*

<img width="476" height="1144" alt="image" src="https://github.com/user-attachments/assets/4187910a-042d-42ef-b57c-88e9da2481ed" />


---

## 💻 Installation / Usage

Copy and paste this code snippet into any webpage where you want to show the downloads:

```html
<section id="rustdesk-downloads" style="font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px;">
  <h2 style="font-size: 2em; margin-bottom: 0.5em;">Download RustDesk</h2>
  <p id="release-info" style="margin-bottom: 1.5em;">Fetching the latest release...</p>
  <div id="downloads"></div>
</section>

<script>
(async () => {
  const info = document.getElementById('release-info');
  const container = document.getElementById('downloads');

  const osGroups = {
    Windows: [],
    macOS: [],
    Linux: [],
    Android: [],
    iOS: [],
    Other: []
  };

  try {
    const res = await fetch('https://api.github.com/repos/rustdesk/rustdesk/releases/latest');
    const data = await res.json();
    info.textContent = `Latest version: ${data.tag_name}`;

    data.assets.forEach(asset => {
      const name = asset.name.toLowerCase();
      const url = asset.browser_download_url;

      if (name.includes('.exe') || name.includes('.msi')) osGroups.Windows.push({ name, url });
      else if (name.includes('.dmg')) osGroups.macOS.push({ name, url });
      else if (name.includes('.deb') || name.includes('.rpm') || name.includes('.appimage') || name.includes('.flatpak') || name.includes('.tar')) osGroups.Linux.push({ name, url });
      else if (name.includes('.apk')) osGroups.Android.push({ name, url });
      else if (name.includes('ios')) osGroups.iOS.push({ name, url });
      else osGroups.Other.push({ name, url });
    });

    for (const [os, files] of Object.entries(osGroups)) {
  if (files.length === 0) continue;

  const section = document.createElement('div');
  section.style.marginBottom = '1.5em';

  const icon = {
    Windows: '🪟',
    macOS: '🍎',
    Linux: '🐧',
    Android: '🤖',
    iOS: '📱',
    Other: '📦'
  }[os];

  section.innerHTML = `<h3 style="margin: 0.5em 0;">${icon} ${os}</h3>`;

  const list = document.createElement('ul');
  list.style.listStyle = 'none';
  list.style.padding = '0';

  files.forEach(file => {
  const li = document.createElement('li');
  li.style.margin = '0.25em 0';

  // Friendly architecture/variant labels
  let archLabel = '';
  if (file.name.includes('x86_64')) archLabel = '64-bit Intel';
  else if (file.name.includes('x86-sciter')) archLabel = '32-bit Intel';
  else if (file.name.includes('aarch64')) archLabel = os === 'macOS' ? 'Apple Silicon (M1/M2)' : '64-bit ARM';
  else if (file.name.includes('armv7')) archLabel = '32-bit ARM';
  else if (file.name.includes('universal')) archLabel = 'Universal';

  li.innerHTML = `
    <a href="${file.url}" target="_blank" style="
      text-decoration: none;
      color: #0073aa;
      font-weight: 500;
    ">${file.name}</a> ${archLabel ? `<span style="color:#555;">(${archLabel})</span>` : ''}
  `;
  list.appendChild(li);
});


  section.appendChild(list);

  // Add macOS note about permissions
  if (os === 'macOS') {
    const note = document.createElement('p');
    note.style.fontSize = '0.9em';
    note.style.color = '#555';
    note.style.marginTop = '0.5em';
    note.textContent = 'Note: After installing RustDesk on macOS, you may need to enable Accessibility and Screen Recording permissions in System Settings → Privacy & Security for full functionality.';
    section.appendChild(note);
  }

  container.appendChild(section);
}

  } catch (err) {
    console.error(err);
    info.textContent = '⚠️ Failed to fetch the latest release information.';
  }
})();
</script>
```

## 🧠 How It Works

- The script uses the GitHub REST API endpoint:
https://api.github.com/repos/rustdesk/rustdesk/releases/latest

- It reads all the downloadable assets in the latest release.

- It groups them by operating system based on filename patterns.

- It dynamically builds and displays a list of links to those files.

## 🧱 Integration Tips

- Works with WordPress, static HTML, or custom CMS pages.

- Can be styled with your site’s CSS for a seamless look.

- Optional: Cache the API response on your backend if you expect heavy traffic (GitHub API has rate limits for anonymous requests).

## 📜 License

- This snippet is open-source under the MIT License

## 💡 Author

Built with ❤️ by Wynand Nel / Creare.Guru

