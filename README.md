<div align="center">

# ⏳ 人生时光 · Life Timer

**一个优雅的人生仪表盘**

实时展示精确年龄、已活时间、人生进度、生日倒计时、生命周数与生命日历

纯前端 · 零依赖 · 开箱即用

**简体中文** · [English](README_EN.md)

</div>

---

## 📖 简介

**人生时光** 是一个纯前端的人生仪表盘。它用最直观的方式，把"时间"这件事可视化出来：

- 你活了多久？
- 人生进度条走到了百分之几？
- 距离下一次生日还有几天几小时几分几秒？
- 你正在度过人生的第几周？
- 在 5200 周的方格中，你已经走过了多少？

没有后端，没有数据库，没有构建工具。双击 `index.html` 就能跑。

---

## ✨ 功能

| 模块 | 说明 |
|---|---|
| 🎂 **精确年龄** | 精确到「岁 / 月 / 天」 |
| ⏱️ **已活时间** | 月、天、小时、分钟、秒，实时跳动 |
| 📊 **人生进度** | 按预期寿命计算进度条，含 50% 刻度线 |
| 🎈 **生日倒计时** | 天 / 时 / 分 / 秒精确倒计时 |
| 📅 **生命周数** | 你正在度过人生的第几周 |
| 🗓️ **生命日历** | 5200 周小方块全览，一眼看尽一生 |
| 🎯 **自定义纪念日** | 距离结婚、入职、毕业等纪念日的倒计时 |
| 🌞 **浅色 / 深色模式** | 一键切换，自动记忆偏好 |
| 💬 **今日状态** | 调用一言 API 获取随机句子（可关闭） |
| 🌈 **隐藏彩蛋** | 双击头像，切换暖色主题 |

---

## 🚀 快速开始

### 方式一：直接下载

1. 点击右上角 **Code → Download ZIP**
2. 解压后双击 `index.html`

就完了。

### 方式二：克隆

```bash
git clone https://github.com/itboy365/life-timer.git
cd life-timer
# 双击 index.html，或用任意静态服务器
```

### 方式三：本地服务器（推荐）

```bash
# Python 3
python -m http.server 8000

# 或 Node.js
npx serve
```

然后访问 `http://localhost:8000`。

---

## ⚙️ 配置

**你只需要改一个文件：`config.js`。**

```javascript
const CONFIG = {
    // 你的出生日期（格式 YYYY-MM-DD）
    birthday: '2000-01-01',

    // 预期寿命（岁），用于计算人生进度
    lifeExpectancy: 100,

    // 头像里显示的文字（建议 1~2 个字）
    avatarText: '人生',

    // 页脚文字
    footerText: '人生时光 · 365天',

    // 双击头像后显示的彩蛋文字
    easterEggText: '故事开始。',

    // 是否启用一言 API（关闭则不请求任何外部服务）
    enableHitokoto: true,

    // 时区偏移（分钟）。默认 +480 = 东八区
    timezoneOffset: 480,

    // 主题：'dark' | 'light' | 'auto'
    theme: 'dark',

    // 自定义纪念日（不想要可以留空数组）
    events: [
        // { name: '结婚纪念日', date: '2024-05-20' },
        // { name: '入职周年', date: '2021-09-01' },
    ]
};
```

改完保存，刷新页面即可。

### 自定义纪念日示例

只要把 `events` 数组里的注释去掉，填入你的日期：

```javascript
events: [
    { name: '结婚纪念日', date: '2024-05-20' },
    { name: '入职周年', date: '2021-09-01' },
    { name: '毕业纪念日', date: '2020-06-30' },
]
```

页面会自动多出一张「纪念日」卡片，为每个日期计算距离下一次的倒计时。

---

## 🌐 部署

### GitHub Pages

1. 进入仓库 **Settings → Pages**
2. **Source** 选择 `Deploy from a branch`
3. **Branch** 选择 `main`，目录选 `/ (root)`
4. 保存，等 1 分钟
5. 访问 `https://itboy365.github.io/life-timer/`

### Vercel

访问 [vercel.com/new](https://vercel.com/new)，导入这个 GitHub 仓库，直接部署即可。

### Netlify

直接把整个文件夹拖到 [app.netlify.com/drop](https://app.netlify.com/drop) 即可。

### Cloudflare Pages

1. 进入 Cloudflare Dashboard → **Pages → Create a project**
2. 连接你的 GitHub 仓库
3. **Build command** 留空
4. **Build output directory** 填 `/`
5. 保存部署

---

## 📁 项目结构

```
life-timer/
├── index.html      # 页面结构
├── style.css       # 全部样式
├── config.js       # 用户配置（唯一需要修改的文件）
├── main.js         # 主逻辑
├── README.md       # 中文说明
├── README_EN.md    # 英文说明
├── LICENSE         # MIT
└── .gitignore
```

**设计原则**：文件少、职责清晰、零依赖。任何能看懂 HTML/CSS/JS 的人都能在 5 分钟内上手。

---

## 🎨 自定义

### 换主题色

编辑 `style.css`，搜索以下颜色变量并替换：

| 用途 | 原色值 | 出现位置 |
|---|---|---|
| 主色渐变起 | `#667eea` | 头像、进度条、大数字、日历方块 |
| 主色渐变止 | `#764ba2` | 同上 |
| 背景深色 | `#1a1a2e` | `body` background |
| 背景渐变 | `#16213e` `#0f3460` | `.bg-gradient` |
| 浅色模式背景 | `#f0f2f8` | `body.light-mode` |
| 彩蛋暖色 | `#c4956a` `#e8c97a` | `.easter-egg` 相关 |

### 添加新的卡片

1. 在 `index.html` 的 `.grid` 里加一个 `<div class="card">`
2. 在 `style.css` 里样式会自动继承
3. 在 `main.js` 里加更新逻辑

---

## 🤝 贡献

欢迎提 Issue 和 PR！

在提交 PR 之前，请确保：

- [ ] 代码风格与现有保持一致
- [ ] 不引入构建工具或第三方依赖
- [ ] 不添加任何追踪、统计脚本
- [ ] `config.js` 保持向后兼容

---

## 📄 许可证

[MIT License](LICENSE) © 2026 itboy365

你可以自由使用、修改、分发、商用，只需保留版权声明。

---

## 🙏 致谢

- 一言 API 由 [hitokoto.cn](https://hitokoto.cn) 提供
- 灵感来自「人生 4000 周」概念

---

<div align="center">

**如果这个项目对你有帮助，欢迎点一个 ⭐ Star**

Made with ❤️ by [itboy365](https://github.com/itboy365)

</div>
