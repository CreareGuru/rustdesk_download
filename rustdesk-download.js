(async () => {
  const info = document.getElementById('release-info');
  const container = document.getElementById('downloads');

  const osGroups = { Windows: [], macOS: [], Linux: [], Android: [], iOS: [], Other: [] };

  const icons = {
    Windows: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/windows.svg',
    macOS: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apple.svg',
    Linux: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linux.svg',
    Android: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/android.svg',
    iOS: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/ios.svg',
    Other: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/file.svg'
  };

  // Detect user OS and architecture
  const userAgent = navigator.userAgent.toLowerCase();
  let userOS = 'Other';
  if (userAgent.includes('win')) userOS = 'Windows';
  else if (userAgent.includes('mac')) userOS = 'macOS';
  else if (userAgent.includes('linux')) userOS = 'Linux';
  else if (userAgent.includes('android')) userOS = 'Android';
  else if (userAgent.includes('iphone') || userAgent.includes('ipad') || userAgent.includes('ipod')) userOS = 'iOS';

  let userArch = 'Universal'; // default for macOS
  if (userOS === 'macOS') {
    if (userAgent.includes('arm') || userAgent.includes('aarch64')) userArch = 'Apple Silicon (M1/M2)';
    else if (userAgent.includes('x86_64')) userArch = '64-bit Intel';
  } else {
    if (userAgent.includes('arm') || userAgent.includes('aarch64')) userArch = '64-bit ARM';
    else if (userAgent.includes('x86_64') || userAgent.includes('win64') || userAgent.includes('amd64')) userArch = '64-bit Intel';
    else if (userAgent.includes('x86') || userAgent.includes('i686')) userArch = '32-bit Intel';
  }

  try {
    const res = await fetch('https://api.github.com/repos/rustdesk/rustdesk/releases/latest');
    const data = await res.json();

    // Clear "Fetching..." immediately
    info.textContent = '';

    // Populate OS groups
    data.assets.forEach(asset => {
      const name = asset.name.toLowerCase();
      const url = asset.browser_download_url;

      if (name.includes('.exe') || name.includes('.msi')) osGroups.Windows.push({ name, url });
      else if (name.includes('.dmg')) osGroups.macOS.push({ name, url });
      else if (name.includes('.deb') || name.includes('.rpm') || name.includes('.appimage') || name.includes('.flatpak') || name.includes('.tar')) osGroups.Linux.push({ name, url });
      else if (name.includes('.apk')) osGroups.Android.push({ name, url });
      else osGroups.Other.push({ name, url });
    });

    // Create OS sections
    for (const [os, files] of Object.entries(osGroups)) {
      if (!files.length) continue;

      const section = document.createElement('div');
      section.style.marginBottom = '1.5em';

      const iconSrc = icons[os] || icons['Other'];
      section.innerHTML = `
        <h3 style="margin: 0.5em 0; display: flex; align-items: center; gap: 0.5em;">
          <img src="${iconSrc}" alt="${os}" style="width:24px;height:24px;"> ${os}
        </h3>
      `;

      const list = document.createElement('ul');
      list.style.listStyle = 'none';
      list.style.padding = '0';
      list.style.margin = '0.5em 0 0 0';

      files.forEach(file => {
        const li = document.createElement('li');
        li.style.margin = '0.25em 0';

        let archLabel = '';
        if (file.name.includes('x86_64')) archLabel = '64-bit Intel';
        else if (file.name.includes('x86-sciter')) archLabel = '32-bit Intel';
        else if (file.name.includes('aarch64')) archLabel = os === 'macOS' ? 'Apple Silicon (M1/M2)' : '64-bit ARM';
        else if (file.name.includes('armv7')) archLabel = '32-bit ARM';
        else if (file.name.includes('universal')) archLabel = 'Universal';

        // Mark recommended if matches userOS and either exact arch or universal
        const isRecommended = os === userOS && (archLabel === userArch || archLabel === 'Universal');

        li.innerHTML = `
          <a href="${file.url}" target="_blank" style="text-decoration:none;color:#0073aa;font-weight:500; ${isRecommended ? 'background:#e0f7ff;padding:0.2em 0.4em;border-radius:4px;' : ''}">
            ${file.name} ${archLabel ? `(${archLabel})` : ''}
          </a>
          ${isRecommended ? '<span style="background:#0073aa;color:white;font-size:0.75em;font-weight:bold;padding:0.15em 0.35em;margin-left:6px;border-radius:4px;vertical-align:middle;">Recommended for you</span>' : ''}
        `;
        list.appendChild(li);
      });

      section.appendChild(list);

      if (os === 'macOS') {
        const note = document.createElement('div');
        note.style.fontSize = '0.9em';
        note.style.color = '#333';
        note.style.marginTop = '0.5em';
        note.style.background = '#f0f0f0';
        note.style.padding = '0.5em 0.75em';
        note.style.borderLeft = '4px solid #0073aa';
        note.style.borderRadius = '4px';
        note.innerHTML = `After installing RustDesk on macOS, you may need to enable the following 2 settings for full functionality:
          <ol style="margin:0.25em 0 0 1.25em;padding:0;">
            <li>System Settings → Privacy & Security → Accessibility</li>
            <li>System Settings → Privacy & Security → Screen and System Audio Recording</li>
          </ol>`;
        section.appendChild(note);
      }

      container.appendChild(section);
    }

    // iOS section
    const iosSection = document.createElement('div');
    iosSection.style.marginBottom = '1.5em';
    iosSection.innerHTML = `
      <h3 style="margin: 0.5em 0; display: flex; align-items: center; gap: 0.5em;">
        <img src="${icons.iOS}" alt="iOS" style="width:24px;height:24px;"> iOS
      </h3>
      <ul style="list-style:none;padding:0;">
        <li style="margin:0.25em 0; ${userOS==='iOS'?'background:#e0f7ff;padding:0.2em 0.4em;border-radius:4px;':''}">
          <a href="https://apps.apple.com/us/app/rustdesk-remote-desktop/id1581225015" target="_blank" style="text-decoration:none;color:#0073aa;font-weight:500;">
            RustDesk on the App Store
          </a>
          ${userOS==='iOS' ? '<span style="background:#0073aa;color:white;font-size:0.75em;font-weight:bold;padding:0.15em 0.35em;margin-left:6px;border-radius:4px;vertical-align:middle;">Recommended for you</span>' : ''}
        </li>
      </ul>
    `;
    const iosNote = document.createElement('p');
    iosNote.style.fontSize = '0.9em';
    iosNote.style.color = '#333';
    iosNote.style.marginTop = '0.5em';
    iosNote.style.background = '#f0f0f0';
    iosNote.style.padding = '0.5em 0.75em';
    iosNote.style.borderLeft = '4px solid #0073aa';
    iosNote.style.borderRadius = '4px';
    iosNote.textContent = 'RustDesk allows you to connect to and control other devices, but iOS devices cannot be controlled remotely using RustDesk.';
    iosSection.appendChild(iosNote);
    container.appendChild(iosSection);

    // Add version at the top
    const versionPara = document.createElement('p');
    versionPara.textContent = `Latest version: ${data.tag_name}`;
    versionPara.style.fontWeight = 'bold';
    versionPara.style.marginBottom = '1em';
    container.prepend(versionPara);

  } catch (err) {
    console.error(err);
    info.textContent = '⚠️ Failed to fetch the latest release information.';
  }
})();
