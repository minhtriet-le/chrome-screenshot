# Screenshot Saver - Chrome Extension

A modern Chrome extension to capture screenshots with automatic URL overlay and save to a custom folder.

## Features

- 📷 **Quick Capture**: Capture the visible area of any webpage
- 🔗 **URL Overlay**: Automatically adds the page URL to the bottom of each screenshot
- 📁 **Custom Folder**: Choose your preferred save location in Downloads
- 🏷️ **Custom Prefix**: Set your own file naming prefix
- 🎨 **Format Options**: Support for PNG and JPEG formats
- ⚡ **Auto-save**: Option to save without confirmation dialog
- 🎯 **Modern UI**: Clean, neutral-toned interface

## Installation

### Install from Source

1. Clone or download this repository:
   ```bash
   git clone https://github.com/minhtriet-le/chrome-screenshot.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top-right corner)

4. Click **Load unpacked** and select the `chrome-screenshot` folder

5. The extension is now ready to use!

## Usage

### Initial Setup

1. Click the extension icon in your Chrome toolbar
2. Configure your preferences:
   - **Save Folder**: Enter folder name (default: "screenshots")
   - **File Prefix**: Set file name prefix (default: "screenshot")
   - **Format**: Choose PNG or JPEG
   - **Auto-save**: Toggle automatic saving without confirmation

### Taking Screenshots

1. Navigate to any webpage
2. Click the extension icon
3. Click **"📷 Capture"** button
4. Screenshot will be saved to `Downloads/[your-folder]/`
5. The URL of the page will be overlaid at the bottom of the screenshot

### Settings

All settings are automatically saved and persisted across sessions:
- Click **"Change"** to modify the save folder
- Adjust file prefix and format as needed
- Toggle auto-save to control confirmation dialog

## File Structure

```
chrome-screenshot/
├── manifest.json          # Extension configuration
├── popup.html            # User interface
├── popup.js              # Core functionality
├── popup.css             # Styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── .gitignore            # Git ignore rules
└── README.md             # Documentation
```

## Permissions

The extension requires the following permissions:

- **activeTab**: Access current tab to capture screenshots
- **downloads**: Save files to Downloads folder
- **storage**: Persist user settings
- **scripting**: Execute scripts for URL overlay functionality

## File Naming

Screenshots are automatically named using the format:
```
[prefix]_YYYY-MM-DDTHH-MM-SS.[format]
```

Example: `screenshot_2025-12-26T14-30-45.png`

If a file with the same name exists, Chrome will automatically append a number.

## Technical Details

### URL Overlay

The extension uses HTML5 Canvas to:
1. Draw the captured screenshot
2. Add a semi-transparent dark overlay at the bottom
3. Render the page URL in white text
4. Automatically truncate long URLs to fit
5. Export the final image with overlay

### Color Scheme

Modern neutral gray palette:
- Background gradient: `#6B7280` → `#374151`
- Primary button: `#4B5563` → `#1F2937`
- Accent colors: Neutral gray tones

## Future Enhancements

Potential features for future development:

- [ ] Full-page screenshot stitching
- [ ] Region selection tool
- [ ] Keyboard shortcuts
- [ ] Annotation tools (draw, text, arrows)
- [ ] Cloud storage integration
- [ ] Screenshot history viewer
- [ ] Batch capture mode
- [ ] Custom overlay templates

## Troubleshooting

If you encounter issues:

1. **Extension not working**: Verify all permissions are granted
2. **Files not saving**: Check Downloads folder permissions
3. **URL not showing**: Ensure scripting permission is enabled
4. **Reload extension**: Go to `chrome://extensions/` and click the reload icon

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

MIT License - Feel free to use and modify

## Credits

Developed by **Le Minh Triet** in collaboration with **GitHub Copilot**

---

⭐ If you find this extension useful, please give it a star on GitHub!
