<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  title?: string
}>(), { variant: 'secondary', size: 'md', type: 'button' })
</script>
<template>
  <button class="tdk-button" :class="['tdk-button--' + variant, 'tdk-button--' + size]" :disabled="disabled || loading" :aria-busy="loading || undefined" :title="title" :type="type">
    <span v-if="loading" class="tdk-button__spinner" aria-hidden="true" /><slot />
  </button>
</template>
<style scoped>
.tdk-button { display:inline-flex; justify-content:center; align-items:center; gap:8px; white-space:nowrap; border:1px solid var(--tdk-border-strong); border-radius:var(--tdk-radius-sm); font-weight:580; height:var(--tdk-control-height); padding:0 13px; background:var(--tdk-surface); color:var(--tdk-text); transition:background .12s, border-color .12s, transform .12s; }
.tdk-button:hover:not(:disabled) { background:var(--tdk-surface-hover); }
.tdk-button:active:not(:disabled) { transform:translateY(1px); }
.tdk-button--primary { background:var(--tdk-accent); color:var(--tdk-accent-contrast); border-color:transparent; }
.tdk-button--primary:hover:not(:disabled) { background:var(--tdk-accent-hover); }
.tdk-button--danger { background:var(--tdk-danger); color:#fff; border-color:transparent; }
.tdk-button--danger:hover:not(:disabled) { filter:brightness(.92); background:var(--tdk-danger); }
.tdk-button--ghost { background:transparent; border-color:transparent; }
.tdk-button--sm { height:29px; padding:0 10px; font-size:12px; }
.tdk-button__spinner { width:13px; height:13px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:tdk-spin .8s linear infinite; }
@keyframes tdk-spin { to { transform:rotate(360deg); } }
@media(prefers-reduced-motion:reduce) { .tdk-button__spinner { animation-duration:2s; } }
</style>