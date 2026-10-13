<script setup lang="ts">
import { computed, ref } from 'vue'
import { UiBadge, UiButton } from '@tdk/ui'
import { Folder, FileText, FileImage, FileVideo, List, Grid2X2, Search, Info } from 'lucide-vue-next'
const items = [
 {id:1,name:'Design System',type:'文件夹',date:'今天 10:24',size:'—',icon:Folder,color:'var(--tdk-accent)'},
 {id:2,name:'Components',type:'文件夹',date:'今天 10:12',size:'—',icon:Folder,color:'var(--tdk-accent)'},
 {id:3,name:'app-preview.png',type:'图片',date:'昨天 18:36',size:'1.8 MB',icon:FileImage,color:'#b586d9'},
 {id:4,name:'project-notes.md',type:'Markdown',date:'昨天 16:20',size:'12 KB',icon:FileText,color:'#74a0c9'},
 {id:5,name:'demo-reel.mp4',type:'视频',date:'10 月 11 日',size:'128 MB',icon:FileVideo,color:'#e9a759'},
 {id:6,name:'README.md',type:'Markdown',date:'10 月 10 日',size:'4 KB',icon:FileText,color:'#74a0c9'},
]
const query = ref('')
const view = ref<'grid'|'list'>('list')
const selectedId = ref<number | null>(null)
const filtered = computed(() => items.filter(item => item.name.toLowerCase().includes(query.value.toLowerCase())))
</script>
<template>
<div class="page-scroller files-page">
  <div class="page-header"><div><div class="eyebrow">EXPLORER / MOCK DATA</div><h1>文件浏览</h1><p>交互演示：文件列表、网格视图与选择状态。所有文件名均为示例数据，不会访问本地磁盘。</p></div><UiBadge tone="warning">UI 演示</UiBadge></div>
  <div class="files-toolbar"><label class="file-search"><Search :size="16"/><input v-model="query" placeholder="搜索示例文件" aria-label="搜索示例文件" /></label><span class="item-counter">{{ filtered.length }} 项</span><div class="view-toggle"><button :class="{active:view==='list'}" title="列表" aria-label="列表视图" @click="view='list'"><List :size="17"/></button><button :class="{active:view==='grid'}" title="网格" aria-label="网格视图" @click="view='grid'"><Grid2X2 :size="17"/></button></div></div>
  <div v-if="view==='list'" class="file-list"><div class="file-list-heading"><span>名称</span><span>修改日期</span><span>类型</span><span>大小</span></div><button v-for="file in filtered" :key="file.id" class="file-row" :class="{selected:selectedId===file.id}" @click="selectedId=file.id"><span class="file-name"><component :is="file.icon" :size="17" :color="file.color"/>{{file.name}}</span><span>{{file.date}}</span><span>{{file.type}}</span><span>{{file.size}}</span></button></div>
  <div v-else class="file-grid"><button v-for="file in filtered" :key="file.id" class="file-tile" :class="{selected:selectedId===file.id}" @click="selectedId=file.id"><component :is="file.icon" :size="29" :color="file.color"/><strong>{{file.name}}</strong><span>{{file.type}} · {{file.size}}</span></button></div>
  <div v-if="filtered.length===0" class="empty-files">没有符合搜索条件的示例文件</div>
  <div class="file-footer"><Info :size="15"/><span>此页面用于 UI 验证，实际系统文件读写将在后续模块中通过 Tauri 文件系统权限接入。</span><UiButton size="sm" variant="ghost" @click="query='';selectedId=null">重置</UiButton></div>
</div>
</template>
<style scoped>
.files-page{max-width:1130px;margin:0 auto}.page-header{display:flex;align-items:center;justify-content:space-between;margin:5px 0 25px;gap:18px}.eyebrow{font-size:10px;letter-spacing:.14em;color:var(--tdk-text-tertiary);font-weight:700}.page-header h1{font-size:25px;margin:12px 0 8px}.page-header p{font-size:11px;color:var(--tdk-text-secondary);margin:0;line-height:1.6}.files-toolbar{display:flex;align-items:center;gap:13px;padding:12px 0}.file-search{display:flex;align-items:center;gap:8px;color:var(--tdk-text-secondary);background:var(--tdk-surface);border:1px solid var(--tdk-border);border-radius:9px;height:35px;padding:0 12px;width:min(320px,100%)}.file-search input{border:0;outline:0;background:transparent;color:var(--tdk-text);width:100%;font-size:12px}.item-counter{font-size:11px;color:var(--tdk-text-tertiary);margin-left:auto}.view-toggle{display:flex;gap:2px;background:var(--tdk-sidebar);border:1px solid var(--tdk-border);border-radius:8px;padding:3px}.view-toggle button{width:28px;height:27px;border:0;background:transparent;color:var(--tdk-text-secondary);display:grid;place-items:center;border-radius:6px}.view-toggle button.active{background:var(--tdk-surface);color:var(--tdk-accent);box-shadow:0 1px 3px #0001}.file-list{border:1px solid var(--tdk-border);border-radius:11px;overflow:hidden;background:var(--tdk-surface)}.file-list-heading,.file-row{display:grid;grid-template-columns:minmax(150px,2fr) minmax(100px,1fr) minmax(80px,.8fr) minmax(60px,.6fr);align-items:center;gap:14px;padding:0 16px}.file-list-heading{height:38px;color:var(--tdk-text-tertiary);font-size:11px;border-bottom:1px solid var(--tdk-border);background:var(--tdk-sidebar)}.file-row{height:var(--tdk-list-height);min-height:35px;border:0;border-bottom:1px solid var(--tdk-border);background:transparent;text-align:left;color:var(--tdk-text-secondary);font-size:11px;width:100%}.file-row:last-child{border:0}.file-row:hover{background:var(--tdk-surface-hover)}.file-row.selected{background:var(--tdk-accent-muted)}.file-name{display:flex;align-items:center;gap:9px;min-width:0;color:var(--tdk-text);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(147px,1fr));gap:13px}.file-tile{display:flex;flex-direction:column;align-items:flex-start;gap:11px;background:var(--tdk-surface);border:1px solid var(--tdk-border);border-radius:12px;padding:19px;text-align:left;color:var(--tdk-text);min-height:132px}.file-tile strong{font-size:11px;overflow:hidden;text-overflow:ellipsis;max-width:100%}.file-tile span{font-size:10px;color:var(--tdk-text-tertiary)}.file-tile:hover{background:var(--tdk-surface-hover)}.file-tile.selected{background:var(--tdk-accent-muted);border-color:var(--tdk-accent)}.file-footer{margin-top:18px;display:flex;align-items:center;gap:9px;color:var(--tdk-text-secondary);font-size:11px;line-height:1.7}.file-footer span{flex:1}.empty-files{padding:50px;text-align:center;font-size:12px;color:var(--tdk-text-secondary)}
</style>
