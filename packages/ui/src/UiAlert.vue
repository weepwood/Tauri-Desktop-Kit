<script setup lang="ts">
import { computed } from 'vue'
import { Info, CircleCheck, TriangleAlert, CircleX } from 'lucide-vue-next'
const props = withDefaults(defineProps<{ tone?: 'info' | 'success' | 'warning' | 'danger'; title?: string }>(), { tone: 'info' })
const symbol = computed(() => ({ info: Info, success: CircleCheck, warning: TriangleAlert, danger: CircleX })[props.tone])
</script>
<template>
  <div class="tdk-alert" :class="'tdk-alert--' + tone" :role="tone === 'danger' ? 'alert' : 'status'">
    <component :is="symbol" :size="17" aria-hidden="true" class="tdk-alert__icon" />
    <div class="tdk-alert__content"><strong v-if="title">{{ title }}</strong><div><slot /></div></div>
  </div>
</template>
<style scoped>
.tdk-alert { display:flex; gap:11px; padding:12px 13px; border:1px solid var(--tdk-border); border-radius:var(--tdk-radius-md); background:var(--tdk-surface); font-size:12px; line-height:1.55; color:var(--tdk-text-secondary); }
.tdk-alert__icon { flex-shrink:0; margin-top:1px; color:var(--tdk-accent); }
.tdk-alert__content { display:grid; gap:3px; }
.tdk-alert__content strong { color:var(--tdk-text); font-size:12px; }
.tdk-alert--success { border-color:color-mix(in srgb,var(--tdk-success) 30%,var(--tdk-border)); }
.tdk-alert--success .tdk-alert__icon { color:var(--tdk-success); }
.tdk-alert--warning { border-color:color-mix(in srgb,var(--tdk-warning) 30%,var(--tdk-border)); }
.tdk-alert--warning .tdk-alert__icon { color:var(--tdk-warning); }
.tdk-alert--danger { border-color:color-mix(in srgb,var(--tdk-danger) 30%,var(--tdk-border)); }
.tdk-alert--danger .tdk-alert__icon { color:var(--tdk-danger); }
</style>