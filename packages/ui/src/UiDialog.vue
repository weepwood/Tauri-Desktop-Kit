<script setup lang="ts">
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose } from 'reka-ui'
import { X } from 'lucide-vue-next'
const open = defineModel<boolean>('open', { default: false })
defineProps<{ title: string; description?: string }>()
</script>
<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="tdk-dialog-overlay" />
      <DialogContent class="tdk-dialog-content">
        <div class="tdk-dialog-heading">
          <div><DialogTitle class="tdk-dialog-title">{{ title }}</DialogTitle><DialogDescription v-if="description" class="tdk-dialog-description">{{ description }}</DialogDescription><DialogDescription v-else class="tdk-dialog-sr">对话框</DialogDescription></div>
          <DialogClose class="tdk-dialog-close" aria-label="关闭对话框"><X :size="17" /></DialogClose>
        </div>
        <div class="tdk-dialog-body"><slot /></div>
        <div v-if="$slots.footer" class="tdk-dialog-footer"><slot name="footer" /></div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
<style scoped>
.tdk-dialog-overlay { position:fixed; inset:0; z-index:100; background:rgba(13,19,34,.48); backdrop-filter:blur(3px); }
.tdk-dialog-content { position:fixed; z-index:101; top:50%; left:50%; transform:translate(-50%,-50%); width:min(460px,calc(100vw - 32px)); max-height:calc(100dvh - 40px); overflow:auto; padding:20px; border:1px solid var(--tdk-border-strong); border-radius:var(--tdk-radius-lg); box-shadow:var(--tdk-shadow); background:var(--tdk-surface-raised); color:var(--tdk-text); }
.tdk-dialog-heading { display:flex; align-items:flex-start; justify-content:space-between; gap:16px; }
.tdk-dialog-title { font-size:16px; font-weight:680; }
.tdk-dialog-description { margin:6px 0 0; color:var(--tdk-text-secondary); font-size:12px; line-height:1.5; }
.tdk-dialog-close { border:0; background:transparent; color:var(--tdk-text-secondary); border-radius:6px; padding:5px; display:flex; cursor:pointer; }
.tdk-dialog-close:hover { background:var(--tdk-surface-hover); }
.tdk-dialog-body { padding:17px 0; font-size:12px; line-height:1.6; }
.tdk-dialog-footer { display:flex; align-items:center; justify-content:flex-end; flex-wrap:wrap; gap:8px; padding-top:14px; border-top:1px solid var(--tdk-border); }
.tdk-dialog-sr { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; }
</style>