<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' }>(), { tone: 'neutral' })
</script>
<template><span class="tdk-badge" :class="'tdk-badge--' + tone"><slot /></span></template>
<style scoped>
.tdk-badge { font-size:11px; line-height:18px; display:inline-flex; align-items:center; padding:1px 7px; border-radius:6px; background:var(--tdk-surface-hover); color:var(--tdk-text-secondary); font-weight:600; }
.tdk-badge--accent { color:var(--tdk-accent); background:var(--tdk-accent-muted); }
.tdk-badge--success { color:var(--tdk-success); background:color-mix(in srgb,var(--tdk-success) 11%,transparent); }
.tdk-badge--warning { color:var(--tdk-warning); background:color-mix(in srgb,var(--tdk-warning) 11%,transparent); }
.tdk-badge--danger { color:var(--tdk-danger); background:color-mix(in srgb,var(--tdk-danger) 11%,transparent); }
</style>