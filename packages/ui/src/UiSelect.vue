<script setup lang="ts">
import { computed, useId } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import type { SelectOption } from './types'
const value = defineModel<string>({ default: '' })
const props = defineProps<{ options: SelectOption[]; id?: string; label?: string; placeholder?: string; hint?: string; error?: string; disabled?: boolean; required?: boolean; name?: string }>()
const uid = useId()
const controlId = computed(() => props.id || 'tdk-select-' + uid)
const detailsId = computed(() => controlId.value + '-details')
</script>
<template>
  <div class="tdk-select-field">
    <label v-if="label" :for="controlId" class="tdk-select-label">{{ label }}<span v-if="required" aria-hidden="true"> *</span></label>
    <div class="tdk-select-wrap" :class="{ 'tdk-select-wrap--error': !!error, 'tdk-select-wrap--disabled': disabled }">
      <select :id="controlId" v-model="value" class="tdk-select" :name="name" :required="required" :disabled="disabled" :aria-invalid="!!error" :aria-describedby="error || hint ? detailsId : undefined">
        <option v-if="placeholder" value="" :disabled="required">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">{{ option.label }}</option>
      </select>
      <ChevronDown :size="15" aria-hidden="true" class="tdk-select-icon" />
    </div>
    <p v-if="error || hint" :id="detailsId" class="tdk-select-hint" :class="{ 'tdk-select-hint--error': !!error }">{{ error || hint }}</p>
  </div>
</template>
<style scoped>
.tdk-select-field { display:grid; gap:7px; min-width:0; }
.tdk-select-label { font-size:12px; font-weight:600; color:var(--tdk-text); }
.tdk-select-label span { color:var(--tdk-danger); }
.tdk-select-wrap { display:flex; align-items:center; border:1px solid var(--tdk-border-strong); border-radius:var(--tdk-radius-sm); background:var(--tdk-surface); min-width:0; }
.tdk-select-wrap:focus-within { border-color:var(--tdk-accent); box-shadow:0 0 0 3px var(--tdk-accent-muted); }
.tdk-select-wrap--error { border-color:var(--tdk-danger); }
.tdk-select-wrap--disabled { opacity:.5; }
.tdk-select { appearance:none; width:100%; min-width:0; height:calc(var(--tdk-control-height) - 2px); border:0; outline:0; padding:0 33px 0 11px; background:transparent; color:var(--tdk-text); cursor:pointer; }
.tdk-select:focus-visible { outline:none; }
.tdk-select:disabled { cursor:not-allowed; }
.tdk-select-icon { flex-shrink:0; margin-left:-27px; margin-right:11px; pointer-events:none; color:var(--tdk-text-secondary); }
.tdk-select-hint { margin:0; font-size:11px; color:var(--tdk-text-secondary); }
.tdk-select-hint--error { color:var(--tdk-danger); }
</style>