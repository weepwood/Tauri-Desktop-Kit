<script setup lang="ts">
import { computed, useId } from 'vue'
const checked = defineModel<boolean>({ default: false })
const props = defineProps<{ label: string; description?: string; disabled?: boolean; name?: string; id?: string }>()
const uid = useId()
const controlId = computed(() => props.id || 'tdk-checkbox-' + uid)
</script>
<template>
  <label class="tdk-check" :class="{ 'tdk-check--disabled': disabled }" :for="controlId">
    <input :id="controlId" v-model="checked" type="checkbox" :name="name" :disabled="disabled" class="tdk-check__input" :aria-describedby="description ? controlId + '-description' : undefined" />
    <span class="tdk-check__content"><span class="tdk-check__label">{{ label }}</span><small v-if="description" :id="controlId + '-description'">{{ description }}</small></span>
  </label>
</template>
<style scoped>
.tdk-check { display:flex; align-items:flex-start; gap:10px; cursor:pointer; }
.tdk-check--disabled { opacity:.5; cursor:not-allowed; }
.tdk-check__input { width:16px; height:16px; margin:2px 0 0; flex-shrink:0; accent-color:var(--tdk-accent); cursor:inherit; }
.tdk-check__content { display:grid; gap:3px; min-width:0; }
.tdk-check__label { color:var(--tdk-text); font-size:12px; font-weight:560; }
.tdk-check small { color:var(--tdk-text-secondary); font-size:11px; line-height:1.5; }
</style>