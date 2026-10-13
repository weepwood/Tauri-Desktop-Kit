<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
const value = defineModel<boolean>({ required: true })
defineProps<{ label: string }>()
</script>
<template>
  <label class="switch-row"><span><slot>{{ label }}</slot></span>
    <SwitchRoot v-model="value" class="switch-track" :aria-label="label"><SwitchThumb class="switch-thumb" /></SwitchRoot>
  </label>
</template>
<style scoped>
.switch-row { display:flex; align-items:center; justify-content:space-between; gap:16px; cursor:pointer; }
.switch-track { position:relative; width:34px; height:20px; flex-shrink:0; border:0; border-radius:30px; background:var(--tdk-border-strong); padding:2px; }
.switch-track[data-state=checked] { background:var(--tdk-accent); }
.switch-thumb { width:16px; height:16px; border-radius:50%; background:#fff; display:block; transition:transform .16s; box-shadow:0 1px 3px #0002; }
.switch-thumb[data-state=checked] { transform:translateX(14px); }
</style>
