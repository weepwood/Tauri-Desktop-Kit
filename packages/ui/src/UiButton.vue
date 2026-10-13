<script setup lang="ts">
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md'; disabled?: boolean; title?: string }>(), { variant: 'secondary', size: 'md' })
</script>
<template>
  <button class="tdk-button" :class="[`tdk-button--${variant}`, `tdk-button--${size}`]" :disabled="disabled" :title="title" type="button">
    <slot />
  </button>
</template>
<style scoped>
.tdk-button { display:inline-flex; justify-content:center; align-items:center; gap:8px; white-space:nowrap; border:1px solid var(--tdk-border); border-radius:9px; font-weight:570; height:var(--tdk-control-height); padding:0 13px; background:var(--tdk-surface); color:var(--tdk-text); transition:background .12s, border-color .12s; }
.tdk-button:hover:not(:disabled) { background:var(--tdk-surface-hover); }
.tdk-button--primary { background:var(--tdk-accent); color:var(--tdk-accent-contrast); border-color:transparent; }
.tdk-button--primary:hover:not(:disabled) { background:var(--tdk-accent-hover); }
.tdk-button--ghost { background:transparent; border-color:transparent; }
.tdk-button--sm { height:29px; padding:0 10px; font-size:12px; }
</style>
