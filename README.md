# Screenshot Saver - Chrome Extension

Extension Chrome để chụp màn hình và lưu vào folder được chọn.

## Tính năng

- 📷 **Chụp vùng nhìn thấy**: Chụp phần hiển thị hiện tại của trang web
- 📄 **Chụp toàn trang**: Chụp toàn bộ trang web (bao gồm phần cuộn)
- 📁 **Tùy chỉnh folder**: Chọn folder lưu trữ trong thư mục Downloads
- 🏷️ **Tùy chỉnh tên file**: Đặt tiền tố cho tên file screenshot
- 🎨 **Chọn định dạng**: Hỗ trợ PNG và JPEG

## Cài đặt

### Cách 1: Developer Mode (Khuyến nghị)

1. Mở Chrome và truy cập `chrome://extensions/`
2. Bật **Developer mode** (góc trên bên phải)
3. Click **Load unpacked**
4. Chọn folder `chrome-screenshot`
5. Extension đã sẵn sàng sử dụng!

### Cách 2: Build từ source

```bash
# Clone hoặc download source code
cd chrome-screenshot

# Load extension như hướng dẫn ở Cách 1
```

## Hướng dẫn sử dụng

1. **Cài đặt ban đầu**
   - Click vào icon extension trên thanh công cụ
   - Nhập tên folder muốn lưu (mặc định: "screenshots")
   - Chọn tiền tố tên file (mặc định: "screenshot")
   - Chọn định dạng ảnh (PNG hoặc JPEG)

2. **Chụp màn hình**
   - Click "📷 Chụp vùng nhìn thấy" để chụp phần hiện tại
   - Click "📄 Chụp toàn trang" để chụp toàn bộ trang web
   - File sẽ tự động được lưu vào `Downloads/[folder-name]/`

3. **Quản lý settings**
   - Tất cả cài đặt được lưu tự động
   - Click "Đổi" để thay đổi folder lưu trữ
   - Thay đổi tiền tố và định dạng được lưu ngay lập tức

## Cấu trúc file

```
chrome-screenshot/
├── manifest.json          # Cấu hình extension
├── popup.html            # Giao diện popup
├── popup.js              # Logic chụp màn hình
├── popup.css             # Styling
├── icons/                # Icon extension
│   ├── icon16.svg
│   ├── icon48.svg
│   └── icon128.svg
└── README.md             # Tài liệu này
```

## Permissions

Extension yêu cầu các quyền sau:

- **activeTab**: Truy cập tab hiện tại để chụp màn hình
- **downloads**: Lưu file vào Downloads
- **storage**: Lưu cài đặt người dùng
- **scripting**: Thực thi script để chụp toàn trang

## Định dạng tên file

File được đặt tên theo format:
```
[prefix]_YYYY-MM-DDTHH-MM-SS.[format]
```

Ví dụ: `screenshot_2025-12-26T10-30-45.png`

## Lưu ý

- Screenshot được lưu trong folder Downloads của hệ thống
- Folder sẽ được tạo tự động nếu chưa tồn tại
- Chức năng chụp toàn trang hiện ở chế độ đơn giản (chụp phần đầu tiên)
- Đối với trang web rất dài, có thể cần cuộn thủ công và chụp nhiều lần

## Phát triển

### Cải tiến trong tương lai

- [ ] Ghép ảnh cho chụp toàn trang hoàn chỉnh
- [ ] Chụp vùng tùy chọn (selection tool)
- [ ] Keyboard shortcuts
- [ ] Annotation tools (vẽ, text)
- [ ] Cloud storage integration
- [ ] History của screenshots

### Báo lỗi

Nếu gặp vấn đề, vui lòng kiểm tra:
1. Extension đã được cài đặt đúng chưa
2. Các quyền đã được cấp đầy đủ chưa
3. Chrome đã được cập nhật lên version mới nhất chưa

## Giấy phép

MIT License - Tự do sử dụng và chỉnh sửa

## Credits

Phát triển bởi GitHub Copilot
