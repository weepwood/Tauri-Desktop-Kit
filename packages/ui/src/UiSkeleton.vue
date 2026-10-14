<script setup lang="ts">
withDefaults(defineProps<{ width?: string; height?: string; circle?: boolean }>(), { width: '100%', height: '13px' })
</script>
<template><span aria-hidden="true" class="tdk-skeleton" :class="{ 'tdk-skeleton--circle': circle }" :style="{ width, height }" /></template>
<style scoped>
.tdk-skeleton { display:block; max-width:100%; border-radius:6px; background:linear-gradient(100deg,var(--tdk-surface-hover) 30%,var(--tdk-surface-active) 50%,var(--tdk-surface-hover) 70%); background-size:200% 100%; animation:tdk-skeleton-shimmer 1.6s linear infinite; }
.tdk-skeleton--circle { border-radius:50%; }
@keyframes tdk-skeleton-shimmer { to { background-position-x:-200%; } }
@media(prefers-reduced-motion:reduce) { .tdk-skeleton { animation:none; } }
</style>