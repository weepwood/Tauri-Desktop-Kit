<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription } from 'reka-ui'
import { Search, Command } from 'lucide-vue-next'
import type { Component } from 'vue'

export interface CommandItem { id: string; name: string; subtitle: string; category: string; icon: Component; run: () => void }
const open = defineModel<boolean>('open', { required: true })
const props = defineProps<{ commands: CommandItem[] }>()
const search = ref('')
const focusIndex = ref(0)
const results = computed(() => props.commands.filter(c => (`${c.name} ${c.subtitle} ${c.category}`).toLowerCase().includes(search.value.trim().toLowerCase())))
watch(search, () => { focusIndex.value = 0 })
watch(open, async value => { if (value) { search.value = ''; await nextTick(); document.getElementById('command-input')?.focus() } })
function select(command?: CommandItem) { if (!command) return; open.value = false; command.run() }
function keyboard(event: KeyboardEvent) {
  if (event.key === 'ArrowDown') { event.preventDefault(); focusIndex.value = Math.min(results.value.length - 1, focusIndex.value + 1) }
  if (event.key === 'ArrowUp') { event.preventDefault(); focusIndex.value = Math.max(0, focusIndex.value - 1) }
  if (event.key === 'Enter') { event.preventDefault(); select(results.value[focusIndex.value]) }
}
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="palette-overlay" />
      <DialogContent class="palette-dialog" aria-describedby="command-description" @keydown="keyboard">
        <DialogTitle class="visually-hidden">命令面板</DialogTitle>
        <DialogDescription id="command-description" class="visually-hidden">搜索并执行桌面应用命令</DialogDescription>
        <div class="palette-search"><Search :size="18"/><input id="command-input" v-model="search" placeholder="输入命令或页面名称..." autocomplete="off" aria-label="搜索命令"/><span class="keycap">ESC</span></div>
        <div class="palette-list">
          <div v-if="!results.length" class="palette-empty">没有匹配的命令</div>
          <button v-for="(item,index) in results" :key="item.id" class="palette-item" :class="{highlighted: index===focusIndex}" @mouseenter="focusIndex=index" @click="select(item)">
            <span class="palette-item-icon"><component :is="item.icon" :size="17"/></span>
            <span class="palette-item-copy"><strong>{{ item.name }}</strong><small>{{ item.subtitle }}</small></span>
            <span class="palette-category">{{ item.category }}</span>
          </button>
        </div>
        <div class="palette-footer"><span><Command :size="13"/> 命令面板</span><span>↑ ↓ 导航　↵ 执行</span></div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
<style>
.palette-overlay { position:fixed; inset:0; background:rgba(16,23,41,.48); z-index:100; backdrop-filter:blur(6px); }
.palette-dialog { position:fixed; left:50%; top:18%; width:min(580px,calc(100vw - 44px)); transform:translateX(-50%); background:var(--tdk-surface-raised); border:1px solid var(--tdk-border-strong); border-radius:16px; box-shadow:var(--tdk-shadow); z-index:101; outline:none; overflow:hidden; color:var(--tdk-text); }
.palette-search { display:flex; align-items:center; gap:12px; padding:16px 17px; border-bottom:1px solid var(--tdk-border); color:var(--tdk-text-secondary); }
.palette-search input { outline:none; border:none; background:transparent; color:var(--tdk-text); width:100%; font-size:14px; }
.palette-search input:focus { outline:none; }
.keycap { padding:3px 6px; border:1px solid var(--tdk-border); background:var(--tdk-canvas); border-radius:5px; font-size:10px; }
.palette-list { padding:8px; max-height:340px; overflow:auto; }
.palette-item { border:0; display:flex; align-items:center; text-align:left; gap:10px; width:100%; border-radius:9px; padding:9px 11px; background:transparent; color:var(--tdk-text); }
.palette-item:hover,.palette-item.highlighted { background:var(--tdk-accent-muted); }
.palette-item-icon { width:32px; height:32px; border:1px solid var(--tdk-border); display:grid; place-items:center; border-radius:8px; background:var(--tdk-surface); color:var(--tdk-accent); }
.palette-item-copy { display:flex; flex-direction:column; align-items:flex-start; gap:4px; flex:1; }
.palette-item-copy strong { font-size:12px; font-weight:620; }
.palette-item-copy small,.palette-category { font-size:11px; color:var(--tdk-text-secondary); }
.palette-footer { display:flex; justify-content:space-between; align-items:center; padding:10px 16px; font-size:11px; color:var(--tdk-text-tertiary); border-top:1px solid var(--tdk-border); }
.palette-footer span { display:flex; gap:6px; align-items:center; }
.palette-empty { padding:28px; text-align:center; color:var(--tdk-text-secondary); }
.visually-hidden { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
</style>
