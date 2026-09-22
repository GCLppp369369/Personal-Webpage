# 个人主页 · Personal Portfolio

暗色低饱和 + 毛玻璃拟态风格的个人主页，纯原生 **HTML / CSS / JavaScript** 搭建，零依赖、零构建。

## 目录结构

```
个人网页/
├── index.html        # 页面结构（内容都在这里改）
├── style.css         # 样式（配色、动效都在这里改）
├── script.js         # 交互脚本（滚动渐显、导航高亮、图片轮播等）
├── 替换指南/          # ★ 素材替换指引 + 变更日志（每次改动都会同步更新）
│   ├── 素材替换指南.md # 所有素材/文案/样式的位置对照表
│   └── 变更日志.md     # 通知日志：每次改动记录
└── assets/
    ├── video/        # 背景视频目录，放入 bg.mp4 即自动生效
    ├── gallery/      # 首屏滑动图片专栏素材，gallery-1.jpg ~ gallery-3.jpg
    └── avatar.jpg    # 头像图片（替换文件即可换图）
```

## 素材替换与变更记录

所有素材（头像、轮播图、背景视频）的存放位置与替换方法，见 **[替换指南/素材替换指南.md](替换指南/素材替换指南.md)**；每次改动记录见 **[替换指南/变更日志.md](替换指南/变更日志.md)**。

## 功能一览

- **顶部玻璃导航**：毛玻璃质感，滚动加深，scrollspy 自动高亮当前区块
- **左侧扇形悬浮侧边栏**：默认收拢为一列图标，悬停后子项沿半圆扇形轨迹展开；单个子项悬停带橙黄光晕
- **入场动画**：页面加载时由模糊渐变为清晰
- **滚动渐显**：各内容块随滚动逐块浮现
- **背景视频接口**：`assets/video/bg.mp4` 就位后自动淡入播放，未就位时显示渐变氛围背景
- **首屏右侧视觉区**：圆形头像占位（放 `assets/avatar.png` 自动替换）+ 玻璃风格滑动图片专栏（自动轮播，悬停暂停，圆点切换）
- **双语悬停提示**：界面为英文，鼠标悬停任意元素显示中文说明
- **响应式**：窄屏下扇形侧边栏隐藏，改为顶部汉堡菜单 + 全屏玻璃菜单

## 修改指南

需要替换的占位内容在 `index.html` 中均有 `<!-- TODO -->` 注释标记：

| 内容 | 位置 |
|---|---|
| 名字 / Logo | 顶部导航 `.logo`、首屏 `.hero-eyebrow` |
| 头像 | 替换 `assets/avatar.jpg`（加载失败时自动显示占位图标） |
| 滑动图片专栏 | 放图片到 `assets/gallery/`，命名 `gallery-1.jpg` ~ `gallery-3.jpg` |
| 自我介绍 | `#about` 的 `.about-card` |
| 数据统计 | `#about` 的 `.stats-grid` |
| 技能卡片 | `#skills`（`--lv` 为熟练度百分比） |
| 项目作品 | `#works` 的 `.work-card`（标题 / 描述 / 链接） |
| 邮箱 / GitHub | `#contact` 的按钮与 `.socials` |

头像与专栏图片：文件不存在时自动显示渐变占位，不会出现破图。

中文悬停说明：每个元素内的 `<span class="zh-hint">中文</span>` 直接改文字即可。

## 本地预览

直接双击 `index.html` 用浏览器打开即可（无需服务器）。

> 提示：部分浏览器（如 Chrome）在 `file://` 协议下限制背景视频自动播放，部署到 GitHub Pages 后无此问题。

## 部署到 GitHub Pages

1. 在 GitHub 新建仓库，把整个目录推上去：

   ```bash
   git init
   git add .
   git commit -m "init: personal portfolio"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/<仓库名>.git
   git push -u origin main
   ```

2. 打开仓库 **Settings → Pages**：
   - Source 选择 **Deploy from a branch**
   - Branch 选择 **main**，目录选择 **/ (root)**，保存

3. 等待几分钟，访问 `https://<你的用户名>.github.io/<仓库名>/` 即可。

纯静态文件，上传即部署，无需打包构建。
