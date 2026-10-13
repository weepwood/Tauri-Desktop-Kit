# Tauri Desktop Kit (TDK)

一套用于现代桌面应用的 **Tauri 2 + Vue 3 + TypeScript + 原生 CSS** 脚手架原型。目标是 Fluent 风格、丰富桌面交互、模块化并且不依赖 Tailwind CSS。

> **状态：v0.1.0 / 第一阶段 Shell 原型**。本项目包含可操作的 UI 及原生 Tauri 工程配置，但部分页面（文件、任务、日志）只提供明确标注的演示数据，不具备对应的真实文件处理或后台执行能力。

## 快速启动

前置条件：Node.js 22.12+、pnpm 10；原生构建还需要 Rust 1.90+、对应平台的 Tauri 2 系统依赖。

```bash
corepack enable
pnpm install
pnpm dev             # 仅 Web Showcase，使用 Browser Mock
pnpm dev:tauri       # Tauri 原生窗口，需 Rust 及平台依赖
pnpm check           # Vue + TS 类型检查
pnpm build           # 打包前端资源
pnpm build:tauri     # 原生安装包
```

Windows：请安装 Rust MSVC 工具链、Visual Studio C++ Build Tools、WebView2；macOS：请安装 Xcode Command Line Tools；Linux：请参照 Tauri 2 官方依赖文档安装 WebKitGTK 等依赖。

## 已包含的功能

- 自定义 Windows 标题栏（macOS 保留系统交通灯、Linux 保留系统窗口装饰）
- 可折叠导航侧栏、右侧 Inspector、可调宽度与底部面板
- 工作台、文件交互演示、任务进度演示、组件展示、设置
- 多标签页与标签恢复、命令面板（Ctrl/⌘ + K）
- 浅色 / 深色 / 跟随系统，紧凑 / 标准 / 宽松密度
- 通过 Tauri Store 保存偏好；Browser Mock 下回退 localStorage
- 通过 Window State 插件恢复原生窗口尺寸和位置
- GitHub Actions 前端检查以及手动跨平台构建工作流（尚未实际在 Actions 运行验证）

## 架构

- `packages/tokens` — CSS Design Tokens
- `packages/ui` — Vue UI 原语（Reka UI + CSS）
- `packages/shell` — 桌面工作区与标题栏
- `packages/desktop` — 浏览器 / Tauri 运行时适配器
- `apps/showcase` — 可操作的工作区演示和 Tauri 原生应用

## 开发状态与边界

- **真正可用**：页面导航、选项卡、组件交互、主题切换、分栏拖拽、显示偏好、浏览器本地持久化；Tauri 插件集成代码已添加，仍需目标平台运行验证。
- **演示用途**：文件列表、计时任务、控制台输出。
- **尚未实现**：Rust TaskManager、文件操作、系统托盘、自动更新、独立模板生成 CLI、独立组件包版本发布。
- **本环境未执行安装构建**：生成环境未安装 pnpm 与 Cargo，且 npm 注册表网络不可达。因此目前无法宣称已验证编译或产生可安装的 EXE。

## 安全

只为主窗口声明受控 Capability 权限，未授予文件系统任意路径或 Shell 执行权限。以后接入 FS 和后台进程时按功能增量授权。发布版应配置更严格的 CSP 策略，并完成签名、系统权限与平台兼容性检查。

更多详情参见 [`docs/IMPLEMENTATION.md`](docs/IMPLEMENTATION.md)。

## GitHub Actions 自动构建

- 每次推送 `main` 都会触发 `Frontend Checks`，并触发 `Desktop Packages` 跨平台打包。
- 可在 Actions → **Desktop Packages** → Run workflow 手动构建。
- 创建 `v*` 标签（例如 `v0.1.0`）后，跨平台构建全部成功时创建 **Draft Release**，需要人工确认后发布。
- Windows 构建 NSIS `.exe` 与 MSI；macOS 分别构建 Apple Silicon/Intel `.dmg`；Linux 构建 `.deb` 和 `.AppImage`。
- 未配置 Windows Authenticode 签名或 macOS Developer ID / 公证；当前 macOS 仅执行 ad-hoc 签名，不等于可信的商业发行签名。首次安装可能触发系统安全提示。
- 不包含自动更新机制；后续如需 Tauri Updater，需要另外配置更新签名、可信分发端点和更新元数据。
- 构建制品下载：仓库 Actions 对应运行的 **Artifacts**；只有版本标签才会创建 Draft Release。

> 当前开发版本尚未生成提交到仓库的 `pnpm-lock.yaml`。CI 暂时使用 `--no-frozen-lockfile`；第一次成功安装后应在受控环境生成并提交锁文件，改为 `--frozen-lockfile` 以提高可复现性。
