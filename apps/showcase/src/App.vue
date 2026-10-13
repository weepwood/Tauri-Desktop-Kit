<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { DesktopShell } from '@tdk/shell'
import { UiBadge } from '@tdk/ui'
import { desktopSettings, platform, runningInTauri } from '@tdk/desktop'
import { usePreferences } from './stores/preferences'
import { navigation, icons } from './data/navigation'
import type { PageId } from './data/navigation'
import CommandPalette from './components/CommandPalette.vue'
import type { CommandItem } from './components/CommandPalette.vue'
import DashboardView from './views/DashboardView.vue'
import FilesView from './views/FilesView.vue'
import TasksView from './views/TasksView.vue'
import ComponentsView from './views/ComponentsView.vue'
import SettingsView from './views/SettingsView.vue'

interface WorkspaceTab { id: PageId; title: string }
const prefs = usePreferences()
const { theme, sidebarCollapsed, inspectorVisible, bottomVisible, sidebarWidth, inspectorWidth, bottomHeight, activeTheme } = storeToRefs(prefs)
const tabs = ref<WorkspaceTab[]>([{id:'dashboard',title:'工作台概览'}])
const activeId = ref<PageId>('dashboard')
const loaded = ref(false)
const commandOpen = ref(false)
const pageInfo = computed(() => navigation.find(item => item.id === activeId.value) ?? navigation[0]!)
const currentView = computed(() => ({dashboard: DashboardView, files: FilesView, tasks: TasksView, components: ComponentsView, settings: SettingsView})[activeId.value])
const os = platform()
const systemName = os === 'browser' ? 'Browser Preview' : os === 'windows' ? 'Windows' : os === 'macos' ? 'macOS' : 'Linux'
const statusTime = ref('')
let clockInterval: ReturnType<typeof setInterval> | undefined
function showPage(id: PageId) {
  if (!tabs.value.some(tab => tab.id===id)) {
    const data = navigation.find(item => item.id===id)!
    tabs.value.push({id,title:data.label})
  }
  activeId.value = id
}
function closeTab(id: PageId) {
  if (id === 'dashboard') return
  const index=tabs.value.findIndex(tab=>tab.id===id)
  if (index<0) return
  tabs.value.splice(index,1)
  if (activeId.value === id) activeId.value = tabs.value[Math.max(0,index-1)]?.id ?? 'dashboard'
}
function toggleTheme() { theme.value = activeTheme.value === 'light' ? 'dark' : 'light' }
function commands():CommandItem[] { return [
  ...navigation.map(n=>({id:`open-${n.id}`,name:`打开${n.label}`,subtitle:n.description,category:'导航',icon:n.icon,run:()=>showPage(n.id)})),
  {id:'toggle-theme',name:'切换浅色 / 深色主题',subtitle:'更改应用显示外观',category:'外观',icon:icons.Palette,run:toggleTheme},
  {id:'toggle-sidebar',name:'折叠 / 展开左侧边栏',subtitle:'切换导航面板',category:'布局',icon:icons.LayoutPanelLeft,run:()=>{sidebarCollapsed.value=!sidebarCollapsed.value}},
  {id:'toggle-inspector',name:'显示 / 隐藏属性面板',subtitle:'切换右侧面板',category:'布局',icon:icons.PanelRightOpen,run:()=>{inspectorVisible.value=!inspectorVisible.value}},
  {id:'toggle-bottom',name:'显示 / 隐藏底部面板',subtitle:'切换控制台',category:'布局',icon:icons.PanelBottom,run:()=>{bottomVisible.value=!bottomVisible.value}}
] }
const commandItems=computed(commands)
function keyboard(e:KeyboardEvent) {
  const shortcut=e.ctrlKey||e.metaKey
  if(shortcut && e.key.toLowerCase()==='k') {e.preventDefault();commandOpen.value=!commandOpen.value}
  if(shortcut && e.key===',') {e.preventDefault();showPage('settings')}
  if(shortcut && e.key.toLowerCase()==='w' && runningInTauri()===false) { // avoid hijacking browser's close-tab shortcut
    return
  }
}
async function init() {
  await prefs.initialize()
  const saved=await desktopSettings.get<{tabs:WorkspaceTab[];activeId:PageId}|null>('workspace',null)
  if(saved && Array.isArray(saved.tabs)) {
    const valid = saved.tabs.filter((t):t is WorkspaceTab=>navigation.some(n=>n.id===t.id))
    const distinct = valid.filter((v,i)=>valid.findIndex(x=>x.id===v.id)===i)
    tabs.value=[{id:'dashboard',title:'工作台概览'},...distinct.filter(t=>t.id!=='dashboard').map(t=>({id:t.id,title:navigation.find(n=>n.id===t.id)!.label}))]
    activeId.value = tabs.value.some(t=>t.id===saved.activeId)?saved.activeId:'dashboard'
  }
  loaded.value=true
}
watch([tabs,activeId],()=>{
  if(!loaded.value)return
  desktopSettings.set('workspace',{tabs:tabs.value,activeId:activeId.value}).catch(console.warn)
},{deep:true})
onMounted(()=>{
  init().catch(error=>console.error('初始化偏好设置失败',error))
  window.addEventListener('keydown',keyboard)
  const clock=()=>{statusTime.value=new Date().toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',hour12:false})}
  clock();clockInterval=setInterval(clock,30_000)
})
onBeforeUnmount(()=>{window.removeEventListener('keydown',keyboard);if(clockInterval)clearInterval(clockInterval)})
</script>
<template>
  <DesktopShell
    title="Tauri Desktop Kit" :sidebar-collapsed="sidebarCollapsed" :inspector-visible="inspectorVisible" :bottom-visible="bottomVisible"
    v-model:sidebar-width="sidebarWidth" v-model:inspector-width="inspectorWidth" v-model:bottom-height="bottomHeight"
    @toggle-sidebar="sidebarCollapsed=!sidebarCollapsed" @toggle-inspector="inspectorVisible=!inspectorVisible" @toggle-bottom="bottomVisible=!bottomVisible" @open-command="commandOpen=true">
    <template #activity>
      <div class="activity-top"><button class="app-mark" title="返回工作台" aria-label="打开工作台" @click="showPage('dashboard')"><icons.Layers3 :size="21"/></button></div>
      <div class="activity-links">
        <button v-for="item in navigation.filter(n=>n.id!=='settings')" :key="item.id" class="activity-button" :class="{active:activeId===item.id}" :title="item.label" :aria-label="item.label" @click="showPage(item.id)"><component :is="item.icon" :size="19"/></button>
      </div>
      <div class="activity-bottom"><button class="activity-button" :class="{active:activeId==='settings'}" title="偏好设置" aria-label="偏好设置" @click="showPage('settings')"><icons.Settings2 :size="19"/></button><button class="activity-button" title="切换主题" aria-label="切换浅色深色主题" @click="toggleTheme"><icons.Sun v-if="activeTheme==='light'" :size="19"/><icons.Moon v-else :size="19"/></button></div>
    </template>
    <template #sidebar>
      <div class="sidebar-heading"><span>工作空间</span><button class="side-more" title="命令面板" aria-label="打开命令面板" @click="commandOpen=true"><icons.MoreHorizontal :size="17"/></button></div>
      <div class="sidebar-profile"><div class="profile-avatar"><icons.Layers3 :size="16"/></div><div class="profile-text"><strong>Desktop Kit</strong><span>Development workspace</span></div><icons.ChevronDown :size="14"/></div>
      <div class="sidebar-label"><span>导航</span><icons.ChevronDown :size="13"/></div>
      <nav class="sidebar-nav" aria-label="页面导航"><button v-for="item in navigation" :key="item.id" class="sidebar-link" :class="{active:activeId===item.id}" @click="showPage(item.id)"><component :is="item.icon" :size="16"/><span>{{item.label}}</span><span v-if="item.id===activeId" class="sidebar-active-dot"></span></button></nav>
      <div class="sidebar-label recent-label"><span>最近访问</span><icons.ChevronDown :size="13"/></div>
      <div class="sidebar-nav"><button v-for="tab in tabs.slice().reverse().slice(0,4)" :key="tab.id" class="sidebar-link subdued" @click="showPage(tab.id)"><icons.NotebookTabs :size="15"/><span>{{tab.title}}</span></button></div>
      <div class="sidebar-spacer"></div>
      <div class="sidebar-help"><div class="help-icon"><icons.Sparkles :size="17"/></div><strong>开始创建你的应用</strong><p>通用工作区、UI Kit 和 Tauri 系统能力将持续完善。</p><button @click="showPage('components')">探索组件 <icons.ArrowUpRight :size="14"/></button></div>
      <div class="sidebar-footer"><span class="user-avatar">T</span><div><strong>TDK Starter</strong><small>本地开发环境</small></div><icons.MoreHorizontal :size="16"/></div>
    </template>
    <template #workspace>
      <div class="tabs-bar"><div class="tab-scroll" role="tablist" aria-label="工作区标签"><div v-for="tab in tabs" :key="tab.id" class="app-tab" :class="{active:activeId===tab.id}" role="tab" :tabindex="activeId===tab.id?0:-1" :aria-selected="activeId===tab.id" @click="activeId=tab.id" @keydown.enter="activeId=tab.id" @keydown.space.prevent="activeId=tab.id"><component :is="navigation.find(n=>n.id===tab.id)?.icon" :size="14"/><span>{{tab.title}}</span><button v-if="tab.id!=='dashboard'" type="button" class="tab-close" :aria-label="`关闭 ${tab.title}`" @click.stop="closeTab(tab.id)" @keydown.enter.stop="closeTab(tab.id)"><icons.X :size="12"/></button></div></div><button class="tabs-add" title="打开命令面板并新增标签" aria-label="新建标签" @click="commandOpen=true"><icons.Plus :size="16"/></button></div>
      <div class="workspace-toolbar"><div class="breadcrumbs"><icons.Layers3 :size="14"/><span>Workspace</span><icons.ChevronRight :size="13"/><strong>{{pageInfo.label}}</strong></div><div class="toolbar-actions"><button title="搜索" aria-label="搜索命令" @click="commandOpen=true"><icons.Search :size="16"/></button><button :title="bottomVisible?'隐藏底部面板':'显示底部面板'" aria-label="切换底部面板" @click="bottomVisible=!bottomVisible"><icons.PanelBottom :size="16"/></button><span class="toolbar-divider"></span><UiBadge tone="success">Preview</UiBadge></div></div>
      <main class="workspace-page" :aria-label="pageInfo.label"><component :is="currentView" @navigate="showPage" @toggle-bottom="bottomVisible=!bottomVisible" /></main>
    </template>
    <template #inspector>
      <div class="inspector-header"><span>检查器</span><button class="plain-icon" title="关闭检查器" aria-label="关闭检查器" @click="inspectorVisible=false"><icons.X :size="16"/></button></div>
      <div class="inspector-content"><span class="inspector-caption">CURRENT VIEW</span><div class="inspector-feature-icon"><component :is="pageInfo.icon" :size="23"/></div><h3>{{pageInfo.label}}</h3><p>{{pageInfo.description}}</p><div class="inspector-divider"></div><span class="inspector-caption">工作区状态</span><div class="meta-row"><span>应用版本</span><strong>0.1.0</strong></div><div class="meta-row"><span>运行环境</span><strong>{{systemName}}</strong></div><div class="meta-row"><span>外观主题</span><strong>{{activeTheme==='dark'?'深色':'浅色'}}</strong></div><div class="meta-row"><span>打开标签</span><strong>{{tabs.length}}</strong></div><div class="inspector-divider"></div><span class="inspector-caption">快速操作</span><button class="inspector-action" @click="commandOpen=true"><icons.Keyboard :size="16"/><span>命令面板</span><kbd>Ctrl K</kbd></button><button class="inspector-action" @click="showPage('settings')"><icons.Palette :size="16"/><span>主题与外观</span><icons.ArrowUpRight :size="14"/></button><div class="inspector-divider"></div><div class="inspector-tip"><icons.Info :size="15"/><span>拖动分隔线可调整面板宽度。布局数据会自动保存到本地。</span></div></div>
      <div class="inspector-end"><span class="online-dot"></span> Workspace ready</div>
    </template>
    <template #bottom><div class="bottom-header"><span><icons.TerminalSquare :size="15"/> 运行面板</span><button class="plain-icon" title="收起" aria-label="收起运行面板" @click="bottomVisible=false"><icons.X :size="15"/></button></div><div class="bottom-content"><div><span class="log-time">{{statusTime}}</span> <UiBadge tone="success">INFO</UiBadge> Desktop Kit Shell 已初始化</div><div><span class="log-time">{{statusTime}}</span> <UiBadge>UI</UiBadge> 主题：{{activeTheme}} · 打开标签 {{tabs.length}}</div><div><span class="log-time">{{statusTime}}</span> <UiBadge>RUNTIME</UiBadge> {{runningInTauri()?'Tauri 原生运行时':'浏览器 Mock 模式（系统能力不可用）'}}</div><div><span class="log-time">{{statusTime}}</span> <UiBadge tone="warning">NOTE</UiBadge> 此区域是静态运行状态演示，不是真实文件日志</div></div></template>
    <template #status><div class="status-left"><icons.CircleDot :size="12"/><span>就绪</span><span class="status-divider"></span><icons.Layers3 :size="12"/><span>main</span></div><div class="status-right"><span>{{ systemName }}</span><span class="status-divider"></span><span>Vue 3 · Tauri 2</span><span class="status-divider"></span><span>{{statusTime}}</span></div></template>
  </DesktopShell>
  <CommandPalette v-model:open="commandOpen" :commands="commandItems" />
</template>
