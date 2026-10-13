<script setup lang="ts">
import { onBeforeUnmount, ref, computed } from 'vue'
import TitleBar from './TitleBar.vue'
const props = withDefaults(defineProps<{
  sidebarCollapsed: boolean
  inspectorVisible: boolean
  bottomVisible: boolean
  sidebarWidth: number
  inspectorWidth: number
  bottomHeight: number
  title?: string
}>(), { title: 'Tauri Desktop Kit' })
const emit = defineEmits<{
  'toggle-sidebar': []; 'toggle-inspector': []; 'toggle-bottom': []; 'open-command': []
  'update:sidebarWidth': [value: number]
  'update:inspectorWidth': [value: number]
  'update:bottomHeight': [value: number]
}>()
const drag = ref<'sidebar' | 'inspector' | 'bottom' | null>(null)
let cleanup: (() => void) | null = null
const mainRef = ref<HTMLElement | null>(null)
const widthStyle = computed(() => ({ width: props.sidebarCollapsed ? '0px' : `${props.sidebarWidth}px` }))
function beginResize(kind: 'sidebar' | 'inspector' | 'bottom', event: PointerEvent) {
  event.preventDefault()
  if (cleanup) cleanup()
  const startX = event.clientX
  const startY = event.clientY
  const start = kind === 'sidebar' ? props.sidebarWidth : kind === 'inspector' ? props.inspectorWidth : props.bottomHeight
  drag.value = kind
  function move(e: PointerEvent) {
    const mainWidth = mainRef.value?.clientWidth ?? 1200
    if (kind === 'sidebar') emit('update:sidebarWidth', Math.min(Math.max(190, start + e.clientX - startX), Math.min(380, mainWidth - 550)))
    if (kind === 'inspector') emit('update:inspectorWidth', Math.min(Math.max(240, start - e.clientX + startX), Math.min(420, mainWidth - 550)))
    if (kind === 'bottom') emit('update:bottomHeight', Math.min(Math.max(130, start - e.clientY + startY), 400))
  }
  function stop() { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', stop); window.removeEventListener('pointercancel', stop); drag.value = null; cleanup = null }
  cleanup = stop
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', stop)
  window.addEventListener('pointercancel', stop)
}
function keyboardResize(kind: 'sidebar' | 'inspector' | 'bottom', event: KeyboardEvent) {
  const down = kind === 'bottom' ? event.key === 'ArrowDown' : event.key === 'ArrowRight'
  const up = kind === 'bottom' ? event.key === 'ArrowUp' : event.key === 'ArrowLeft'
  if (!down && !up) return
  event.preventDefault()
  const step = event.shiftKey ? 32 : 8
  const sign = down ? 1 : -1
  if (kind === 'sidebar') emit('update:sidebarWidth', Math.max(190, Math.min(380, props.sidebarWidth + sign * step)))
  if (kind === 'inspector') emit('update:inspectorWidth', Math.max(240, Math.min(420, props.inspectorWidth - sign * step)))
  if (kind === 'bottom') emit('update:bottomHeight', Math.max(130, Math.min(400, props.bottomHeight - sign * step)))
}
onBeforeUnmount(() => cleanup?.())
</script>
<template>
  <div class="desktop-shell" :class="{'shell-dragging': drag !== null}">
    <TitleBar :title="title" :sidebar-collapsed="sidebarCollapsed" :inspector-visible="inspectorVisible" @toggle-sidebar="emit('toggle-sidebar')" @toggle-inspector="emit('toggle-inspector')" @open-command="emit('open-command')" />
    <div ref="mainRef" class="shell-body">
      <aside class="activity-rail"><slot name="activity" /></aside>
      <aside v-if="!sidebarCollapsed" class="shell-sidebar" :style="widthStyle"><slot name="sidebar" /></aside>
      <div v-if="!sidebarCollapsed" class="resize-handle vertical" role="separator" tabindex="0" aria-label="调整侧栏宽度" aria-orientation="vertical" aria-valuemin="190" aria-valuemax="380" :aria-valuenow="sidebarWidth" @keydown="keyboardResize('sidebar',$event)" @pointerdown="beginResize('sidebar',$event)" />
      <div class="shell-main">
        <div class="shell-workspace"><slot name="workspace" /></div>
        <template v-if="bottomVisible">
          <div class="resize-handle horizontal" role="separator" tabindex="0" aria-label="调整底部面板高度" aria-orientation="horizontal" aria-valuemin="130" aria-valuemax="400" :aria-valuenow="bottomHeight" @keydown="keyboardResize('bottom',$event)" @pointerdown="beginResize('bottom',$event)"/>
          <section class="shell-bottom" :style="{height:`${bottomHeight}px`}"><slot name="bottom" /></section>
        </template>
      </div>
      <div v-if="inspectorVisible" class="resize-handle vertical" role="separator" tabindex="0" aria-label="调整属性面板宽度" aria-orientation="vertical" aria-valuemin="240" aria-valuemax="420" :aria-valuenow="inspectorWidth" @keydown="keyboardResize('inspector',$event)" @pointerdown="beginResize('inspector',$event)" />
      <aside v-if="inspectorVisible" class="shell-inspector" :style="{width:`${inspectorWidth}px`}"><slot name="inspector" /></aside>
    </div>
    <footer class="shell-status"><slot name="status" /></footer>
  </div>
</template>
<style scoped>
.desktop-shell { display:flex; flex-direction:column; height:100%; width:100%; background:var(--tdk-canvas); overflow:hidden; }
.shell-body { display:flex; flex:1; min-height:0; min-width:0; }
.activity-rail { width:56px; min-width:56px; height:100%; background:var(--tdk-sidebar); border-right:1px solid var(--tdk-border); display:flex; flex-direction:column; }
.shell-sidebar { background:var(--tdk-sidebar); min-width:0; display:flex; flex-direction:column; overflow:hidden; }
.shell-main { flex:1; min-width:0; min-height:0; display:flex; flex-direction:column; background:var(--tdk-surface); }
.shell-workspace { flex:1; min-height:0; min-width:0; display:flex; flex-direction:column; }
.shell-bottom { min-height:0; flex-shrink:0; overflow:hidden; background:var(--tdk-surface); }
.shell-inspector { display:flex; flex-direction:column; flex-shrink:0; min-width:0; overflow:auto; background:var(--tdk-sidebar); }
.resize-handle { background:var(--tdk-border); flex-shrink:0; position:relative; z-index:10; }
.resize-handle:hover,.shell-dragging .resize-handle { background:var(--tdk-accent); }
.resize-handle.vertical { width:1px; cursor:col-resize; }
.resize-handle.vertical:after { content:''; position:absolute; left:-4px; width:9px; top:0; bottom:0; }
.resize-handle.horizontal { height:1px; cursor:row-resize; }
.resize-handle.horizontal:after { content:''; position:absolute; top:-4px; height:9px; left:0; right:0; }
.shell-status { height:var(--tdk-statusbar-height); min-height:var(--tdk-statusbar-height); border-top:1px solid var(--tdk-border); background:var(--tdk-sidebar); display:flex; align-items:center; }
.shell-dragging { user-select:none; }
@media (max-width:800px) { .activity-rail { width:48px; min-width:48px; } }
</style>
