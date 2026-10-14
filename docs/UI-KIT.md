# TDK UI Kit · v0.2 组件 API

目标：从 Tauri Desktop Kit 提取可跨项目复用的 **Vue 3 + TypeScript + 原生 CSS** 组件，参考 Style-Atlas 视觉研究，保持桌面密度、浅/深色和键盘访问一致。无 Tailwind 依赖，UI 层不调用 Tauri。

## 组件清单

| 模块 | 组件 | 主要 API |
|---|---|---|
| 操作 | UiButton | variant / size / type / loading / disabled |
| 标记 | UiBadge | tone |
| 开关 | UiSwitch | v-model / label |
| 表单 | UiInput | v-model / label / hint / error / prefix、suffix 插槽 |
| 表单 | UiSelect | v-model / options / label / hint / error |
| 表单 | UiCheckbox | v-model / label / description |
| 导航 | UiTabs | v-model / items / 默认插槽 selected |
| 反馈 | UiProgress | value / max / tone / showValue |
| 反馈 | UiAlert | title / tone / 默认插槽 |
| 浮层 | UiDialog | v-model:open / title / description / footer 插槽 |
| 容器 | UiCard | title / description / padded / header、footer 插槽 |
| 加载 | UiSkeleton | width / height / circle |

## 用法

在 pnpm workspace 中依赖 `@tdk/ui` 和 `@tdk/tokens`：

```ts
import '@tdk/tokens/styles.css'
import { UiButton, UiInput, UiDialog } from '@tdk/ui'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { UiButton, UiDialog, UiInput } from '@tdk/ui'
const name = ref('')
const open = ref(false)
</script>
<template>
  <UiInput v-model="name" label="名称" placeholder="请输入名称" />
  <UiButton variant="primary" @click="open = true">创建</UiButton>
  <UiDialog v-model:open="open" title="创建项目" description="确认创建项目">
    {{ name }}
    <template #footer><UiButton @click="open = false">关闭</UiButton></template>
  </UiDialog>
</template>
```

## 边界与约定

- 旧的 UiButton、UiBadge、UiSwitch 调用方式保持兼容；新增组件均由 `@tdk/ui` 导出。
- 颜色、间距、尺寸统一复用 `--tdk-*` Token；通过 `data-theme="dark"` 和 `data-density` 切换外观。
- Input、Select、Checkbox 使用原生语义元素；Dialog 使用 Reka UI 管理焦点、Esc 和 Modal 语义。
- Tab 支持方向键、Home、End；减少动画时禁用 Skeleton 闪动。
- 此阶段不包含虚拟表格、文件管理器和命令面板组件，不把业务组件强行放入通用层。
- `@tdk/ui` 当前仍为 **workspace-only**，导出源码的方式不能当作已发布 npm 包。后续再补齐打包入口、样式分发、语义版本及发布工作流。
- 自测：运行 `pnpm install`、`pnpm check`、`pnpm build`，访问组件页逐项验证交互；Windows/Tauri 实机焦点及缩放仍需额外验证。
