<script setup lang="ts">
import { computed, useId } from 'vue'
const value = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  id?: string; label?: string; hint?: string; error?: string; placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'url'; name?: string
  autocomplete?: string; disabled?: boolean; required?: boolean
}>(), { type: 'text' })
const uid = useId()
const controlId = computed(() => props.id || 'tdk-input-' + uid)
const detailsId = computed(() => controlId.value + '-details')
const hasDetails = computed(() => !!(props.error || props.hint))
</script>
<template>
  <div class="tdk-field" :class="{ 'tdk-field--invalid': !!error }">
    <label v-if="label" class="tdk-field__label" :for="controlId">{{ label }}<span v-if="required" aria-hidden="true"> *</span></label>
    <div class="tdk-input-wrap">
      <span v-if="$slots.prefix" class="tdk-input-wrap__adornment"><slot name="prefix" /></span>
      <input :id="controlId" v-model="value" class="tdk-input" :type="type" :name="name" :autocomplete="autocomplete" :placeholder="placeholder" :disabled="disabled" :required="required" :aria-invalid="!!error" :aria-describedby="hasDetails ? detailsId : undefined" />
      <span v-if="$slots.suffix" class="tdk-input-wrap__adornment"><slot name="suffix" /></span>
    </div>
    <p v-if="hasDetails" :id="detailsId" class="tdk-field__details" :class="{ 'tdk-field__details--error': !!error }">{{ error || hint }}</p>
  </div>
</template>
<style scoped>
.tdk-field { display:grid; gap:7px; min-width:0; }
.tdk-field__label { color:var(--tdk-text); font-size:12px; font-weight:600; }
.tdk-field__label span { color:var(--tdk-danger); }
.tdk-input-wrap { display:flex; align-items:center; min-width:0; min-height:var(--tdk-control-height); border:1px solid var(--tdk-border-strong); border-radius:var(--tdk-radius-sm); background:var(--tdk-surface); transition:border-color .15s, box-shadow .15s; }
.tdk-input-wrap:focus-within { border-color:var(--tdk-accent); box-shadow:0 0 0 3px var(--tdk-accent-muted); }
.tdk-field--invalid .tdk-input-wrap { border-color:var(--tdk-danger); }
.tdk-input-wrap:has(.tdk-input:disabled) { opacity:.55; background:var(--tdk-canvas); }
.tdk-input { flex:1; width:100%; min-width:0; height:calc(var(--tdk-control-height) - 2px); padding:0 11px; border:0; outline:none; background:transparent; color:var(--tdk-text); }
.tdk-input:focus-visible { outline:none; }
.tdk-input::placeholder { color:var(--tdk-text-tertiary); }
.tdk-input-wrap__adornment { display:inline-flex; align-items:center; padding:0 9px; color:var(--tdk-text-secondary); }
.tdk-field__details { margin:0; color:var(--tdk-text-secondary); font-size:11px; line-height:1.45; }
.tdk-field__details--error { color:var(--tdk-danger); }
</style>