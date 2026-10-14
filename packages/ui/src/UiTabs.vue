<script setup lang="ts">
import { computed, useId } from 'vue'
export interface TabItem { value: string; label: string; disabled?: boolean }
const selected = defineModel<string>({ required: true })
const props = defineProps<{ items: TabItem[]; label?: string }>()
const uid = useId()
const baseId = 'tdk-tab-' + uid
const activeItem = computed(() => props.items.find(item => item.value === selected.value && !item.disabled))
function onKeydown(event: KeyboardEvent, index: number) {
  if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
  event.preventDefault()
  const enabled = props.items.map((item, idx) => ({ item, idx })).filter(entry => !entry.item.disabled)
  if (!enabled.length) return
  const current = enabled.findIndex(entry => entry.idx === index)
  const next = event.key === 'Home' ? 0 : event.key === 'End' ? enabled.length - 1 :
    (current + (event.key === 'ArrowRight' ? 1 : -1) + enabled.length) % enabled.length
  const target = enabled[next]
  if (!target) return
  selected.value = target.item.value
  const tab = event.currentTarget as HTMLElement
  const tablist = tab.parentElement
  const buttons = tablist?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
  buttons?.[target.idx]?.focus()
}
</script>
<template>
  <div class="tdk-tabs">
    <div role="tablist" class="tdk-tabs__list" :aria-label="label || '标签页'">
      <button v-for="(item, index) in items" :id="baseId + '-' + index" :key="item.value" type="button" role="tab"
        class="tdk-tabs__tab" :class="{ 'tdk-tabs__tab--active': selected === item.value }"
        :aria-selected="selected === item.value" :aria-controls="baseId + '-panel'"
        :tabindex="selected === item.value ? 0 : -1" :disabled="item.disabled"
        @click="selected = item.value" @keydown="onKeydown($event, index)">{{ item.label }}</button>
    </div>
    <div :id="baseId + '-panel'" role="tabpanel" class="tdk-tabs__panel" tabindex="0" :aria-labelledby="baseId + '-' + items.findIndex(item => item.value === activeItem?.value)">
      <slot :selected="selected" />
    </div>
  </div>
</template>
<style scoped>
.tdk-tabs__list { display:flex; gap:3px; border-bottom:1px solid var(--tdk-border); overflow-x:auto; }
.tdk-tabs__tab { appearance:none; border:0; border-bottom:2px solid transparent; background:transparent; padding:9px 13px; color:var(--tdk-text-secondary); font-size:12px; white-space:nowrap; }
.tdk-tabs__tab:hover:not(:disabled) { color:var(--tdk-text); background:var(--tdk-surface-hover); }
.tdk-tabs__tab--active { color:var(--tdk-accent); border-bottom-color:var(--tdk-accent); font-weight:650; }
.tdk-tabs__panel { padding:15px 3px 2px; color:var(--tdk-text); }
</style>