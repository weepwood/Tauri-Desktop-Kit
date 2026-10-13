<script setup lang="ts">
import { computed, ref, onUnmounted } from 'vue'
import { UiBadge, UiButton } from '@tdk/ui'
import { Play, Pause, RotateCcw, CircleCheck, Info, FileArchive, Image, Video, ListChecks } from 'lucide-vue-next'
type State = 'running' | 'paused' | 'done'
interface DemoTask { id: number; title: string; desc: string; progress: number; state: State; icon: typeof Image }
const tasks = ref<DemoTask[]>([
  {id:1,title:'生成图片缩略图',desc:'演示任务 · 120 项',progress:72,state:'running',icon:Image},
  {id:2,title:'处理视频预览',desc:'演示任务 · demo.mp4',progress:36,state:'paused',icon:Video},
  {id:3,title:'压缩归档',desc:'演示任务 · 12 项文件',progress:100,state:'done',icon:FileArchive}
])
const completed = computed(() => tasks.value.filter(t => t.state === 'done').length)
const running = computed(() => tasks.value.filter(t => t.state === 'running').length)
function toggle(task: DemoTask) { if(task.state==='done') {task.progress=0;task.state='running'} else task.state=task.state==='running'?'paused':'running' }
const interval = window.setInterval(() => { for(const task of tasks.value) { if(task.state==='running') { task.progress=Math.min(100,task.progress+1); if(task.progress===100) task.state='done' } } },950)
onUnmounted(() => clearInterval(interval))
</script>
<template>
<div class="page-scroller tasks-page">
 <div class="page-header"><span class="eyebrow">TASK CENTER / INTERACTION MOCK</span><h1>任务中心</h1><p>任务队列、进度与暂停/继续的 UI 交互演示。进度使用前端模拟计时器，不会执行文件处理。</p></div>
 <div class="task-stats"><div><div class="stat-label">任务总数</div><strong>{{ tasks.length }}</strong><small><ListChecks :size="13"/> UI DEMO</small></div><div><div class="stat-label">执行中</div><strong>{{ running }}</strong><small><Play :size="13"/> 模拟运行</small></div><div><div class="stat-label">已完成</div><strong>{{ completed }}</strong><small><CircleCheck :size="13"/> 演示完成</small></div></div>
 <div class="task-heading"><h2>所有任务</h2><UiBadge tone="warning">示例任务</UiBadge></div>
 <div class="task-list"><article v-for="task in tasks" :key="task.id" class="task-item"><div class="task-icon"><component :is="task.icon" :size="20"/></div><div class="task-info"><div class="task-title"><strong>{{task.title}}</strong><UiBadge :tone="task.state==='done'?'success':task.state==='running'?'accent':'neutral'">{{task.state==='done'?'已完成':task.state==='running'?'运行中':'已暂停'}}</UiBadge></div><p>{{task.desc}}</p><div class="task-progress"><div :style="{width:`${task.progress}%`}" :class="{completed:task.state==='done'}"></div></div><div class="progress-caption"><span>{{task.state==='running'?'正在模拟处理':task.state==='paused'?'已暂停':'完成'}}</span><span>{{task.progress}}%</span></div></div><UiButton variant="ghost" size="sm" :title="task.state==='running'?'暂停':task.state==='paused'?'继续':'重新开始'" @click="toggle(task)"><Pause v-if="task.state==='running'" :size="16"/><Play v-else-if="task.state==='paused'" :size="16"/><RotateCcw v-else :size="16"/></UiButton></article></div>
 <div class="task-note"><Info :size="17"/><div><strong>下一阶段将接入 Rust TaskManager</strong><p>持久化队列、线程调度、错误重试、取消信号和真实断点恢复会作为可选业务模块引入。</p></div></div>
</div>
</template>
<style scoped>
.tasks-page{max-width:1000px;margin:0 auto}.page-header{margin:5px 0 25px}.eyebrow{font-size:10px;letter-spacing:.15em;font-weight:700;color:var(--tdk-text-tertiary)}.page-header h1{font-size:25px;margin:12px 0 8px}.page-header p{font-size:12px;line-height:1.7;color:var(--tdk-text-secondary);margin:0}.task-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:13px;margin-bottom:29px}.task-stats>div{background:var(--tdk-surface);border:1px solid var(--tdk-border);padding:18px;border-radius:12px;display:flex;flex-direction:column;gap:9px}.stat-label{font-size:11px;color:var(--tdk-text-secondary)}.task-stats strong{font-size:28px;letter-spacing:-.04em}.task-stats small{display:flex;align-items:center;gap:6px;color:var(--tdk-text-tertiary);font-size:10px}.task-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:13px}.task-heading h2{font-size:15px;margin:0}.task-list{border:1px solid var(--tdk-border);border-radius:12px;overflow:hidden;background:var(--tdk-surface)}.task-item{padding:19px;display:flex;gap:15px;border-bottom:1px solid var(--tdk-border)}.task-item:last-child{border-bottom:0}.task-icon{width:42px;height:42px;border-radius:10px;color:var(--tdk-accent);background:var(--tdk-accent-muted);display:grid;place-items:center;flex-shrink:0}.task-info{flex:1;min-width:0}.task-title{display:flex;align-items:center;gap:10px}.task-title strong{font-size:12px}.task-info p{color:var(--tdk-text-secondary);font-size:11px;margin:7px 0 15px}.task-progress{height:5px;border-radius:5px;background:var(--tdk-border);overflow:hidden}.task-progress>div{height:100%;background:var(--tdk-accent);border-radius:5px;transition:width .7s linear}.task-progress .completed{background:var(--tdk-success)}.progress-caption{display:flex;justify-content:space-between;margin-top:8px;color:var(--tdk-text-tertiary);font-size:10px}.task-note{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--tdk-border);padding:18px;border-radius:12px;margin-top:20px;color:var(--tdk-accent);background:var(--tdk-accent-muted)}.task-note strong{color:var(--tdk-text);font-size:12px}.task-note p{font-size:11px;margin:7px 0 0;color:var(--tdk-text-secondary);line-height:1.7}
</style>
