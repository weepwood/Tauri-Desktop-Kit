<script setup lang="ts">
import { computed } from 'vue'
import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen, Search, Minus, Square, X, Layers3 } from 'lucide-vue-next'
import { desktopWindow, platform, runningInTauri } from '@tdk/desktop'
const props = defineProps<{ sidebarCollapsed: boolean; inspectorVisible: boolean; title?: string }>()
const emit = defineEmits<{ 'toggle-sidebar': []; 'toggle-inspector': []; 'open-command': [] }>()
const os = platform()
const mac = os === 'macos'
const controls = os === 'windows'
const appTitle = computed(() => props.title || 'Tauri Desktop Kit')
</script>
<template>
  <header class="tdk-titlebar" :class="{'mac-titlebar': mac}" data-tauri-drag-region>
    <div class="titlebar-left" data-tauri-drag-region>
      <div v-if="!mac" class="brand-icon" aria-hidden="true"><Layers3 :size="16" :stroke-width="2.5" /></div>
      <button class="icon-btn" :aria-label="sidebarCollapsed ? '展开侧栏' : '折叠侧栏'" @click="emit('toggle-sidebar')">
        <PanelLeftOpen v-if="sidebarCollapsed" :size="17"/><PanelLeftClose v-else :size="17"/>
      </button>
      <div class="titlebar-title" data-tauri-drag-region>{{ appTitle }}</div>
    </div>
    <div class="titlebar-center" data-tauri-drag-region>
      <button class="search-command" @click="emit('open-command')" title="打开命令面板 Ctrl/⌘ + K"><Search :size="14"/><span>搜索页面、命令或设置</span><kbd>⌘ K / Ctrl K</kbd></button>
    </div>
    <div class="titlebar-right" data-tauri-drag-region>
      <button class="icon-btn" :aria-label="inspectorVisible ? '隐藏属性面板' : '显示属性面板'" @click="emit('toggle-inspector')">
        <PanelRightClose v-if="inspectorVisible" :size="17"/><PanelRightOpen v-else :size="17"/>
      </button>
      <div v-if="controls" class="window-controls">
        <button aria-label="最小化" @click="desktopWindow.minimize()"><Minus :size="14"/></button>
        <button aria-label="最大化或还原" @click="desktopWindow.toggleMaximize()"><Square :size="12"/></button>
        <button class="close-control" aria-label="关闭" @click="desktopWindow.close()"><X :size="16"/></button>
      </div>
      <span v-if="!runningInTauri()" class="browser-pill">浏览器预览</span>
    </div>
  </header>
</template>
<style scoped>
.tdk-titlebar { height:var(--tdk-titlebar-height); min-height:var(--tdk-titlebar-height); display:grid; grid-template-columns:minmax(215px,1fr) minmax(120px,420px) minmax(120px,1fr); align-items:center; border-bottom:1px solid var(--tdk-border); background:var(--tdk-sidebar); user-select:none; }
.titlebar-left,.titlebar-right { display:flex; align-items:center; gap:10px; padding:0 12px; height:100%; min-width:0; }
.titlebar-right { justify-content:flex-end; padding-right:0; }
.titlebar-center { padding:0 10px; display:flex; align-items:center; justify-content:center; height:100%; }
.brand-icon { width:26px; height:26px; border-radius:8px; display:grid; place-items:center; color:white; background:linear-gradient(155deg,#9bb1fb,#5a7adf 65%,#4e61b9); }
.titlebar-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--tdk-text); font-weight:650; font-size:12px; letter-spacing:.02em; }
.icon-btn { width:29px; height:29px; border:0; background:transparent; color:var(--tdk-text-secondary); display:inline-grid; place-items:center; border-radius:7px; flex-shrink:0; }
.icon-btn:hover { color:var(--tdk-text); background:var(--tdk-surface-hover); }
.search-command { display:flex; gap:9px; align-items:center; width:100%; max-width:400px; border:1px solid var(--tdk-border); background:var(--tdk-surface); color:var(--tdk-text-secondary); height:29px; border-radius:8px; text-align:left; padding:0 10px; font-size:12px; }
.search-command:hover { border-color:var(--tdk-border-strong); }
.search-command span { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.search-command kbd { font-family:inherit; font-size:10px; color:var(--tdk-text-tertiary); white-space:nowrap; }
.window-controls { height:100%; display:flex; align-items:stretch; margin-left:7px; }
.window-controls button { display:grid; place-items:center; width:43px; height:100%; color:var(--tdk-text-secondary); border:0; background:transparent; }
.window-controls button:hover { background:var(--tdk-surface-hover); color:var(--tdk-text); }
.window-controls .close-control:hover { background:#db4052; color:#fff; }
.browser-pill { background:var(--tdk-accent-muted); color:var(--tdk-accent); border-radius:5px; padding:3px 7px; font-size:10px; margin-right:14px; white-space:nowrap; }
.mac-titlebar .titlebar-left { padding-left:88px; }
@media (max-width:950px) { .tdk-titlebar { grid-template-columns:minmax(140px,1fr) minmax(100px,280px) minmax(64px,1fr); } .titlebar-title { display:none; } .search-command kbd {display:none;} }
</style>
