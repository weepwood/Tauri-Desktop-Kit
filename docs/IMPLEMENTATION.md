# TDK v0.1 实施记录与后续规划

## 第一阶段范围

目标：让用户能够在 Tauri 2 原生窗口中运行一个可用的 Vue 3 Fluent 风格 Shell。完成侧栏、Inspector、底部面板、命令面板、标签栏、主题与密度。所有业务 Demo 与真实系统访问分离。

## 架构约束

1. `@tdk/ui` 不直接依赖任何 Tauri API。
2. `@tdk/desktop` 封装系统能力调用，Web 预览使用浏览器存储 Mock。
3. `@tdk/shell` 不依赖应用的特定业务页面，使用插槽注入 Activity / Sidebar / Workspace / Inspector / Bottom / Status。
4. `apps/showcase` 是真实可运行的演示应用，而不是静态概念图。
5. Tauri Capability 按窗口授权，新增插件必须同步更新 Rust、JS、权限与文档。

## Windows 检查表

- `pnpm install` 和 `pnpm check` 成功
- `pnpm dev:tauri` 可以启动窗口，最小化/最大化/关闭正常
- 自定义标题栏的非按钮区域可拖动窗口，双击标题栏行为符合系统预期
- 100% / 125% / 150% / 200% 缩放时无文字覆盖与错位
- 左侧和右侧面板可以拖动宽度，可折叠，重启后恢复
- 浏览器与 Tauri 模式主题、密度切换生效
- 系统主题变化时，`system` 模式能跟随；固定主题不受影响
- Ctrl+K / ⌘K 搜索命令、上下键、回车与 Esc 操作正常
- 标签可打开/关闭，重启后可恢复
- 切换多屏、分辨率时窗口仍可见
- 开始菜单安装与卸载正常；不遗漏运行时依赖

## 后续阶段

**v0.2 / UI Kit**：Dialog、Dropdown、ContextMenu、TreeView、虚拟滚动、Toast、Storybook 或 Histoire 演示与 Vitest 测试。

**v0.3 / Native Services**：系统托盘、文件对话框、通知、日志、IPC Contracts、任务队列的持久化设计。

**v0.4 / Build & Release**：签名、自动更新、Release 草稿、真实 Windows / macOS 安装测试。

**v0.5 / Starter CLI**：抽离模板生成器、按需启用模块、测试两个独立新项目。

## 风险提示

- 当前未能在生成环境运行 pnpm / Rust 构建；需在有依赖的设备或 GitHub Actions 验证。
- 远程桌面、WebView 版本和 DPI 对自绘窗口影响大；Windows 测试应优先进行。
- macOS Overlay 模式的原生交通灯位置和标题栏拖动行为需实机检查。
- 第一版暂不启用 Acrylic / Mica，避免透明窗口平台兼容问题；未来提供渐进增强。
- 当前缺少 pnpm-lock.yaml，第一次安装后应生成并提交锁文件，CI 切换成 --frozen-lockfile。
