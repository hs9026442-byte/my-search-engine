# ByteSearch - Your Personal Search Engine

![ByteSearch Logo](https://img.shields.io/badge/ByteSearch-Search%20Smarter-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)

## 📖 Overview

ByteSearch is a modern, lightweight search engine interface that provides quick access to popular web services and Wikipedia information. Built with clean, responsive design principles and optimized for all devices.

**Live Demo:** [https://hs9026442-byte.github.io/my-search-engine/](https://hs9026442-byte.github.io/my-search-engine/)

## ✨ Features

- 🎨 **Modern Dark UI** - Sleek gradient backgrounds and smooth animations
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Lightweight** - No dependencies, pure HTML/CSS/JavaScript
- 🔍 **Quick Search** - One-click access to Google, YouTube, Facebook, and Wikipedia
- 🎯 **Wikipedia Integration** - Real-time search results from Wikipedia API
- ♿ **Accessible** - Semantic HTML and keyboard navigation support
- 🌐 **SEO Optimized** - Proper meta tags and structured markup

## 🚀 Getting Started

### Prerequisites
No installation required! ByteSearch is a static website that runs entirely in your browser.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/hs9026442-byte/my-search-engine.git
   cd my-search-engine
   ```

2. **Open in browser:**
   - Simply open `index.html` in your web browser
   - Or use a local server:
     ```bash
     # Python 3
     python -m http.server 8000
     
     # Python 2
     python -m SimpleHTTPServer 8000
     
     # Node.js
     npx http-server
     ```

3. **Visit:** `http://localhost:8000`

## 📁 Project Structure

```
my-search-engine/
├── index.html              # Homepage
├── results.html            # Search results page
├── css/
│   ├── style.css          # Main page styles
│   ├── results.css        # Results page styles
│   └── common.css         # Shared styles
├── js/
│   ├── search.js          # Main page functionality
│   ├── results.js         # Results page functionality
│   └── utils.js           # Shared utilities
├── README.md              # This file
├── LICENSE                # MIT License
└── .gitignore             # Git ignore file
```

## 🎯 Usage

### Basic Search
1. Enter your search query in the search box
2. Press Enter or click the Search button
3. View results from Wikipedia

### Quick Search
- Click one of the quick search buttons:
  - **Google** - Search Google
  - **YouTube** - Search YouTube videos
  - **Facebook** - Visit Facebook
  - **Wikipedia** - Search Wikipedia

## 🔧 Customization

### Change Colors
Edit `css/style.css` and `css/results.css`:
```css
/* Primary accent color */
--accent-color: #168cff;

/* Background gradients */
background: linear-gradient(135deg, #020817, #001b3d, #020817);
```

### Add More Quick Search Options
Edit `index.html` and add buttons:
```html
<button onclick="quickSearch('Search Term')">Button Label</button>
```

### Modify Search Results Source
Edit `js/results.js` and change the API endpoint in the `getResult()` function.

## 🌐 API Usage

ByteSearch uses the **Wikipedia API** for search results:
- **Endpoint:** `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
- **Documentation:** [Wikipedia API Docs](https://en.wikipedia.org/api/rest_v1/#/)
- **No authentication required** - CORS enabled

## 📊 Browser Support

| Browser | Support |
|---------|----------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ⚠️ Limited |

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/hs9026442-byte/my-search-engine.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test on multiple devices

4. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**

### Development Guidelines
- Use semantic HTML
- Keep CSS organized and commented
- Write clean, readable JavaScript
- Test responsiveness on mobile devices
- Ensure accessibility standards (WCAG 2.1)

## 🐛 Known Issues

- None currently documented

## 📋 Roadmap

- [ ] Dark/Light theme toggle
- [ ] Search history
- [ ] Custom search engine options
- [ ] Settings page
- [ ] Multiple language support
- [ ] Progressive Web App (PWA) features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**ByteSearch Development Team**
- GitHub: [@hs9026442-byte](https://github.com/hs9026442-byte)

## 🙏 Acknowledgments

- Wikipedia API for providing free search data
- Icon design inspiration from modern search engines
- Open source community for best practices

## 📧 Support

If you have questions or feedback:
- Open an [Issue](https://github.com/hs9026442-byte/my-search-engine/issues)
- Submit a [Pull Request](https://github.com/hs9026442-byte/my-search-engine/pulls)

---

**Made with ❤️ by ByteSearch Team**

*Last Updated: 2026-08-22*