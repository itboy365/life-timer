<div align="center">

# ⏳ Life Timer

**An elegant life dashboard**

Displays your exact age, time lived, life progress, birthday countdown, and weeks lived — in real time.

Pure frontend · Zero dependencies · Ready to run

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![HTML](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](index.html)
[![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3&logoColor=white)](style.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript&logoColor=black)](main.js)

[简体中文](README.md) · **English**

</div>

---

## 📖 Introduction

**Life Timer** is a pure frontend dashboard that visualizes the most abstract thing in your life — *time*.

- How long have you lived?
- What percentage of your life has passed?
- How many days, hours, minutes, and seconds until your next birthday?
- Which week of your life are you currently in?

No backend, no database, no build tools. Just double-click `index.html`.

---

## ✨ Features

| Module | Description |
|---|---|
| 🎂 **Exact Age** | Precise to years / months / days |
| ⏱️ **Time Lived** | Months, days, hours, minutes, seconds — ticking live |
| 📊 **Life Progress** | Progress bar based on life expectancy, with a 50% marker |
| 🎈 **Birthday Countdown** | Days / hours / minutes / seconds |
| 📅 **Weeks Lived** | Which week of your life you're in |
| 💬 **Daily Quote** | Random sentence from Hitokoto API (can be disabled) |
| 🌈 **Easter Egg** | Double-click the avatar to switch to a warm theme |

---

## 🚀 Quick Start

### Option 1: Download

1. Click **Code → Download ZIP** at the top right
2. Unzip and double-click `index.html`

Done.

### Option 2: Clone

```bash
git clone https://github.com/itboy365/life-timer.git
cd life-timer
# Double-click index.html, or use any static server
```

### Option 3: Local Server (Recommended)

```bash
# Python 3
python -m http.server 8000

# Or Node.js
npx serve
```

Then visit `http://localhost:8000`.

---

## ⚙️ Configuration

**You only need to edit one file: `config.js`.**

```javascript
const CONFIG = {
    // Your birthday (format: YYYY-MM-DD)
    birthday: '2000-01-01',

    // Life expectancy (years), used for the progress bar
    lifeExpectancy: 100,

    // Text displayed in the avatar (1–2 characters recommended)
    avatarText: '人生',

    // Footer text
    footerText: '人生时光 · 365天',

    // Easter egg text shown after double-clicking the avatar
    easterEggText: '故事开始。',

    // Enable Hitokoto API (disable to avoid all external requests)
    enableHitokoto: true,

    // Timezone offset in minutes. Default +480 = UTC+8
    timezoneOffset: 480
};
```

Save and refresh.

---

## 🌐 Deployment

### GitHub Pages

1. Go to **Settings → Pages**
2. **Source**: `Deploy from a branch`
3. **Branch**: `main`, directory `/ (root)`
4. Save and wait ~1 minute
5. Visit `https://itboy365.github.io/life-timer/`

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/itboy365/life-timer)

### Netlify

Drag the entire folder into [Netlify Drop](https://app.netlify.com/drop).

### Cloudflare Pages

1. Cloudflare Dashboard → **Pages → Create a project**
2. Connect your GitHub repository
3. **Build command**: leave empty
4. **Build output directory**: `/`
5. Save and deploy

---

## 📁 Project Structure

```
life-timer/
├── index.html      # Page structure
├── style.css       # All styles
├── config.js       # User config (the only file you need to edit)
├── main.js         # Main logic
├── README.md       # Chinese README
├── README_EN.md    # English README (this file)
├── LICENSE         # MIT
└── .gitignore
```

**Design principles**: Few files, clear responsibilities, zero dependencies. Anyone who can read HTML/CSS/JS can get started in 5 minutes.

---

## 🎨 Customization

### Change Theme Colors

Edit `style.css` and replace the following color values:

| Purpose | Original Value | Where It Appears |
|---|---|---|
| Primary gradient (start) | `#667eea` | Avatar, progress bar, big number |
| Primary gradient (end) | `#764ba2` | Same as above |
| Dark background | `#1a1a2e` | `body` background |
| Background gradient | `#16213e` `#0f3460` | `.bg-gradient` |
| Easter egg warm colors | `#c4956a` `#e8c97a` | `.easter-egg` related |

### Add a New Card

1. Add a `<div class="card">` inside `.grid` in `index.html`
2. Styles are inherited automatically from `style.css`
3. Add update logic in `main.js`

---

## 🤝 Contributing

Issues and PRs are welcome!

Before submitting a PR, please make sure:

- [ ] Code style is consistent with the existing codebase
- [ ] No build tools or third-party dependencies are introduced
- [ ] No tracking or analytics scripts are added
- [ ] `config.js` remains backward compatible

---

## 📄 License

[MIT License](LICENSE) © 2026 itboy365

You are free to use, modify, distribute, and use commercially — just keep the copyright notice.

---

## 🙏 Credits

- Hitokoto API provided by [hitokoto.cn](https://hitokoto.cn)
- Inspired by the "Your Life in Weeks" concept

---

<div align="center">

**If this project helps you, consider giving it a ⭐ Star**

Made with ❤️ by [itboy365](https://github.com/itboy365)

</div>
