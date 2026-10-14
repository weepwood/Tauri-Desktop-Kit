<script setup lang="ts">
defineProps<{ title?: string; description?: string; padded?: boolean }>()
</script>
<template>
  <section class="tdk-card" :class="{ 'tdk-card--padded': padded !== false }">
    <div v-if="title || description || $slots.header" class="tdk-card__header">
      <slot name="header"><strong v-if="title">{{ title }}</strong><p v-if="description">{{ description }}</p></slot>
    </div>
    <div class="tdk-card__body"><slot /></div>
    <div v-if="$slots.footer" class="tdk-card__footer"><slot name="footer" /></div>
  </section>
</template>
<style scoped>
.tdk-card { min-width:0; border:1px solid var(--tdk-border); border-radius:var(--tdk-radius-lg); background:var(--tdk-surface); box-shadow:0 2px 7px rgba(0,0,0,.025); overflow:hidden; }
.tdk-card__header { display:grid; gap:5px; padding-bottom:13px; }
.tdk-card__header strong { font-size:13px; font-weight:650; }
.tdk-card__header p { margin:0; font-size:11px; color:var(--tdk-text-secondary); line-height:1.5; }
.tdk-card--padded .tdk-card__header { padding:16px 17px 13px; }
.tdk-card--padded .tdk-card__body { padding:0 17px 17px; }
.tdk-card--padded:not(:has(.tdk-card__header)) .tdk-card__body { padding-top:17px; }
.tdk-card__footer { border-top:1px solid var(--tdk-border); background:var(--tdk-canvas); padding:11px 17px; }
</style>