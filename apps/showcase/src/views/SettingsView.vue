<script setup lang="ts">
import { UiBadge, UiSwitch } from '@tdk/ui'
import { storeToRefs } from 'pinia'
import { usePreferences } from '../stores/preferences'
import { Palette, LayoutPanelLeft, Monitor, Moon, Sun, Info } from 'lucide-vue-next'
const themeOptions = [
  {value:'system', name:'跟随系统', icon:Monitor},
  {value:'light', name:'浅色模式', icon:Sun},
  {value:'dark', name:'深色模式', icon:Moon}
] as const
const densityOptions = [
  {id:'compact', label:'紧凑'},
  {id:'normal', label:'标准'},
  {id:'comfortable', label:'宽松'}
] as const
const settings = usePreferences()
const { theme, density, sidebarCollapsed, inspectorVisible, bottomVisible } = storeToRefs(settings)
</script>
<template>
  <div class="page-scroller settings-page">
    <div class="setting-intro"><span class="eyebrow">PREFERENCES / 01</span><h1>个性化设置</h1><p>偏好设置会持久化，重新启动应用后自动恢复。</p></div>
    <section class="setting-section"><div class="setting-section-label"><Palette :size="18"/><div><h2>外观与主题</h2><p>按你的偏好调整桌面工作区。</p></div></div>
      <div class="setting-block"><div class="setting-row"><div><strong>主题模式</strong><p>跟随系统，也可以使用固定的浅色或深色模式。</p></div><UiBadge tone="accent">实时生效</UiBadge></div>
        <div class="theme-options">
          <button v-for="option in themeOptions" :key="option.value" :class="{selected:theme===option.value}" @click="theme=option.value">
            <component :is="option.icon" :size="18"/><span>{{ option.name }}</span><span class="selection-dot"/>
          </button>
        </div>
      </div>
      <div class="setting-block"><div class="setting-row"><div><strong>内容密度</strong><p>控制按钮、列表及工作区间距。</p></div></div><div class="density-options"><button v-for="option in densityOptions" :key="option.id" :class="{selected:density===option.id}" @click="density=option.id">{{ option.label }}</button></div></div>
    </section>
    <section class="setting-section"><div class="setting-section-label"><LayoutPanelLeft :size="18"/><div><h2>工作区布局</h2><p>自由选择需要显示的面板。</p></div></div>
      <div class="setting-block"><UiSwitch v-model="sidebarCollapsed" label="折叠左侧导航"><span><strong>折叠左侧导航</strong><small>仅保留图标活动栏</small></span></UiSwitch></div>
      <div class="setting-block"><UiSwitch v-model="inspectorVisible" label="显示右侧属性面板"><span><strong>显示右侧属性面板</strong><small>显示上下文信息与操作建议</small></span></UiSwitch></div>
      <div class="setting-block"><UiSwitch v-model="bottomVisible" label="显示底部面板"><span><strong>显示底部面板</strong><small>显示开发阶段的运行状态和日志占位页</small></span></UiSwitch></div>
    </section>
    <div class="setting-note"><Info :size="16"/><span>当前版本仅完成 Shell 和 UI 演示。原生托盘、自动更新和持久任务引擎将在后续阶段接入。</span></div>
  </div>
</template>
<style scoped>
.settings-page{max-width:920px;margin:0 auto}.setting-intro{margin:7px 0 28px}.eyebrow{color:var(--tdk-text-tertiary);font-size:10px;letter-spacing:.14em;font-weight:700}.setting-intro h1{margin:12px 0 7px;font-size:25px;letter-spacing:-.04em}.setting-intro p,.setting-section-label p{color:var(--tdk-text-secondary);font-size:12px;line-height:1.7;margin:0}.setting-section{margin-bottom:27px}.setting-section-label{display:flex;gap:12px;align-items:center;margin-bottom:15px;color:var(--tdk-accent)}.setting-section-label h2{font-size:14px;color:var(--tdk-text);margin:0 0 4px}.setting-block{border:1px solid var(--tdk-border);border-radius:12px;padding:19px 20px;margin-bottom:10px;background:var(--tdk-surface)}.setting-row{display:flex;justify-content:space-between;align-items:center;gap:12px}.setting-row strong,.setting-block strong{font-size:12px;font-weight:650}.setting-row p,.setting-block small{display:block;margin:6px 0 0;color:var(--tdk-text-secondary);font-size:11px}.theme-options{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:17px}.theme-options button{display:flex;gap:9px;align-items:center;padding:13px;border:1px solid var(--tdk-border);border-radius:10px;background:var(--tdk-canvas);color:var(--tdk-text-secondary);font-size:12px;text-align:left}.theme-options button.selected{color:var(--tdk-accent);background:var(--tdk-accent-muted);border-color:var(--tdk-accent)}.selection-dot{margin-left:auto;width:11px;height:11px;border:1px solid var(--tdk-border-strong);border-radius:50%}.selected .selection-dot{border:3px solid var(--tdk-accent);background:var(--tdk-surface)}.density-options{display:flex;gap:8px;margin-top:17px}.density-options button{border:1px solid var(--tdk-border);background:var(--tdk-canvas);border-radius:8px;padding:9px 22px;color:var(--tdk-text);font-size:12px}.density-options .selected{border-color:var(--tdk-accent);color:var(--tdk-accent);background:var(--tdk-accent-muted)}.setting-note{display:flex;gap:10px;align-items:start;color:var(--tdk-text-secondary);line-height:1.8;font-size:11px;background:var(--tdk-accent-muted);padding:15px;border-radius:10px}.setting-note svg{flex-shrink:0;color:var(--tdk-accent)}
</style>
