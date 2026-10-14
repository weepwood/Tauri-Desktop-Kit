<script setup lang="ts">
import { computed, useId } from 'vue'
const props = withDefaults(defineProps<{ value: number; max?: number; label?: string; showValue?: boolean; tone?: 'accent' | 'success' | 'warning' }>(), { max: 100, tone: 'accent' })
const id = useId()
const safeMax = computed(() => Number.isFinite(props.max) && props.max > 0 ? props.max : 100)
const safeValue = computed(() => Math.min(safeMax.value, Math.max(0, Number.isFinite(props.value) ? props.value : 0)))
const percent = computed(() => Math.round((safeValue.value / safeMax.value) * 100))
</script>
<template>
  <div class="tdk-progress" :class="'tdk-progress--' + tone">
    <div v-if="label || showValue" class="tdk-progress__heading"><span :id="id + '-label'">{{ label }}</span><span v-if="showValue">{{ percent }}%</span></div>
    <div role="progressbar" class="tdk-progress__track" :aria-label="label || '进度'" :aria-valuenow="safeValue" aria-valuemin="0" :aria-valuemax="safeMax" :aria-labelledby="label ? id + '-label' : undefined">
      <div class="tdk-progress__fill" :style="{ width: percent + '%' }" />
    </div>
  </div>
</template>
<style scoped>
.tdk-progress { display:grid; gap:9px; }
.tdk-progress__heading { display:flex; justify-content:space-between; color:var(--tdk-text-secondary); font-size:11px; }
.tdk-progress__track { height:7px; overflow:hidden; border-radius:999px; background:var(--tdk-surface-active); }
.tdk-progress__fill { height:100%; border-radius:inherit; background:var(--tdk-accent); transition:width .18s ease; }
.tdk-progress--success .tdk-progress__fill { background:var(--tdk-success); }
.tdk-progress--warning .tdk-progress__fill { background:var(--tdk-warning); }
</style>