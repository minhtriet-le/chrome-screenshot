// Load settings from storage
async function loadSettings() {
  const result = await chrome.storage.sync.get({
    folderPath: 'screenshots',
    filePrefix: 'screenshot',
    format: 'png',
    autoSave: true
  });
  
  document.getElementById('folderPath').value = result.folderPath;
  document.getElementById('filePrefix').value = result.filePrefix;
  document.getElementById('format').value = result.format;
  document.getElementById('autoSave').checked = result.autoSave;
  
  return result;
}

// Save settings to storage
async function saveSettings() {
  const settings = {
    folderPath: document.getElementById('folderPath').value || 'screenshots',
    filePrefix: document.getElementById('filePrefix').value || 'screenshot',
    format: document.getElementById('format').value,
    autoSave: document.getElementById('autoSave').checked
  };
  
  await chrome.storage.sync.set(settings);
  return settings;
}

// Show status message
function showStatus(message, isError = false) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.className = isError ? 'status error' : 'status success';
  statusEl.classList.remove('hidden');
  
  setTimeout(() => {
    statusEl.classList.add('hidden');
  }, 3000);
}

// Generate filename
function generateFilename(prefix, format) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
  return `${prefix}_${timestamp}.${format}`;
}

// Add URL overlay to screenshot
async function addUrlOverlay(dataUrl, url, format) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw original image
      ctx.drawImage(img, 0, 0);
      
      // Setup overlay background
      const padding = 15;
      const fontSize = Math.max(14, Math.floor(img.width / 80));
      ctx.font = `${fontSize}px Arial`;
      const textWidth = ctx.measureText(url).width;
      const boxHeight = fontSize + padding * 2;
      const boxWidth = Math.min(textWidth + padding * 2, img.width - 20);
      const boxX = 10;
      const boxY = img.height - boxHeight - 10;
      
      // Draw semi-transparent background
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
      
      // Draw URL text
      ctx.fillStyle = '#FFFFFF';
      ctx.textBaseline = 'middle';
      
      // Truncate URL if too long
      let displayUrl = url;
      if (textWidth > boxWidth - padding * 2) {
        const maxChars = Math.floor((boxWidth - padding * 2) / (fontSize * 0.6));
        displayUrl = url.substring(0, maxChars - 3) + '...';
      }
      
      ctx.fillText(displayUrl, boxX + padding, boxY + boxHeight / 2);
      
      // Convert to blob and then to data URL
      canvas.toBlob((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      }, format === 'jpeg' ? 'image/jpeg' : 'image/png');
    };
    img.src = dataUrl;
  });
}

// Capture visible area of the tab
async function captureVisible() {
  try {
    await saveSettings();
    const settings = await loadSettings();
    
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    let dataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: settings.format
    });
    
    // Add URL overlay
    dataUrl = await addUrlOverlay(dataUrl, tab.url, settings.format);
    
    const filename = `${settings.folderPath}/${generateFilename(settings.filePrefix, settings.format)}`;
    
    await chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: !settings.autoSave,
      conflictAction: 'uniquify'
    });
    
    showStatus('✓ Screenshot saved successfully!');
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    showStatus('✗ Error: ' + error.message, true);
  }
}

// Change folder dialog
function changeFolder() {
  const currentFolder = document.getElementById('folderPath').value;
  const newFolder = prompt('Enter folder name (in Downloads):', currentFolder);
  
  if (newFolder !== null && newFolder.trim() !== '') {
    document.getElementById('folderPath').value = newFolder.trim();
    saveSettings();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  
  document.getElementById('captureBtn').addEventListener('click', captureVisible);
  document.getElementById('changeFolderBtn').addEventListener('click', changeFolder);
  
  // Auto-save on input change
  document.getElementById('filePrefix').addEventListener('change', saveSettings);
  document.getElementById('format').addEventListener('change', saveSettings);
  document.getElementById('autoSave').addEventListener('change', saveSettings);
});
