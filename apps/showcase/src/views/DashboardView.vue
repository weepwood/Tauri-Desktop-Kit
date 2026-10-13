<script setup lang="ts">
import { UiBadge, UiButton } from '@tdk/ui'
import { ArrowUpRight, Blocks, BookOpenText, FolderClosed, TerminalSquare, Settings2, ShieldCheck, CircleCheck, Timer, CheckCircle2, LayoutPanelLeft, AppWindow } from 'lucide-vue-next'
import { runningInTauri } from '@tdk/desktop'
const emit = defineEmits<{navigate: [page: 'files' | 'tasks' | 'components' | 'settings']; 'toggle-bottom': []}>()
const features = [
  { icon: AppWindow, title: '原生桌面 Shell', body: '自绘 Windows 标题栏、导航、标签页与可调整的工作区。', tag: '已实现', status: 'done' },
  { icon: Blocks, title: '统一组件与主题', body: '无 Tailwind，基于设计变量的浅色、深色和密度系统。', tag: '已实现', status: 'done' },
  { icon: TerminalSquare, title: '任务与运行日志', body: '当前提供交互演示；真正的 Rust 任务引擎留待第二阶段。', tag: '交互原型', status: 'demo' }
] as const
</script>
<template>
  <div class="page-scroller dashboard-page">
    <div class="dash-overline"><span class="overline-dot"></span> DESKTOP DEVELOPMENT WORKSPACE <span class="dash-version">v0.1.0</span></div>
    <section class="dash-hero">
      <div class="hero-copy">
        <div class="hero-eyebrow"><UiBadge tone="accent">Tauri 2</UiBadge><UiBadge>Vue 3</UiBadge><UiBadge>TypeScript</UiBadge></div>
        <h1>让桌面应用开发<br/><span>从优秀的起点开始。</span></h1>
        <p>一个干净、精细、可扩展的桌面应用底座。把时间留给真正的产品功能，而不是反复搭建窗口、主题和导航。</p>
        <div class="hero-actions">
          <UiButton variant="primary" @click="emit('navigate','components')"><Blocks :size="15"/> 浏览 UI 组件 <ArrowUpRight :size="14"/></UiButton>
          <UiButton @click="emit('navigate','settings')"><Settings2 :size="15"/> 自定义工作区</UiButton>
        </div>
      </div>
      <div class="hero-art" aria-hidden="true">
        <div class="halo halo-one"></div><div class="halo halo-two"></div>
        <div class="mock-window"><div class="mock-top"><i></i><i></i><i></i><span></span></div><div class="mock-content"><div class="mock-sidebar"><div class="mock-pill"></div><div class="mock-row"></div><div class="mock-row short"></div><div class="mock-row"></div></div><div class="mock-center"><div class="mock-heading"></div><div class="mock-cards"><div></div><div></div></div><div class="mock-line"></div><div class="mock-line short"></div></div></div></div>
        <div class="float-chip"><CircleCheck :size="14"/> Ready to build</div>
      </div>
    </section>
    <div class="section-heading"><div><h2>工作区</h2><p>一切从这里开始</p></div><span class="section-aside">QUICK ACCESS / 01</span></div>
    <div class="quick-grid">
      <button class="quick-card" @click="emit('navigate','files')"><div class="quick-icon violet"><FolderClosed :size="20"/></div><strong>文件浏览</strong><span>桌面文件管理交互示例</span><ArrowUpRight class="quick-arrow" :size="16"/></button>
      <button class="quick-card" @click="emit('navigate','tasks')"><div class="quick-icon orange"><Timer :size="20"/></div><strong>任务中心</strong><span>任务状态与进度交互示例</span><ArrowUpRight class="quick-arrow" :size="16"/></button>
      <button class="quick-card" @click="emit('navigate','components')"><div class="quick-icon blue"><LayoutPanelLeft :size="20"/></div><strong>组件目录</strong><span>组件状态与可复用视觉规范</span><ArrowUpRight class="quick-arrow" :size="16"/></button>
      <button class="quick-card" @click="emit('toggle-bottom')"><div class="quick-icon green"><TerminalSquare :size="20"/></div><strong>控制台</strong><span>查看运行信息和 Shell 状态</span><ArrowUpRight class="quick-arrow" :size="16"/></button>
    </div>
    <div class="section-heading second"><div><h2>构建进度</h2><p>当前里程碑</p></div><span class="section-aside">MILESTONE / 01</span></div>
    <div class="feature-list">
      <article v-for="feature in features" :key="feature.title" class="feature-row">
        <div class="feature-icon"><component :is="feature.icon" :size="18"/></div>
        <div class="feature-copy"><h3>{{feature.title}}</h3><p>{{feature.body}}</p></div>
        <UiBadge :tone="feature.status === 'done' ? 'success' : 'warning'">{{feature.tag}}</UiBadge>
      </article>
    </div>
    <div class="dash-footer"><div><ShieldCheck :size="14"/> 浏览器模拟与 Tauri 模式兼容</div><div><CheckCircle2 :size="14"/> {{ runningInTauri() ? 'Tauri Runtime' : 'Browser Preview' }}</div><a href="https://v2.tauri.app" target="_blank" rel="noopener noreferrer"><BookOpenText :size="14"/> Tauri 文档 <ArrowUpRight :size="12"/></a></div>
  </div>
</template>
<style scoped>
.dashboard-page { max-width:1190px; margin:0 auto; }
.dash-overline { display:flex; align-items:center; gap:9px; font-weight:730; letter-spacing:.16em; font-size:10px; color:var(--tdk-text-tertiary); margin:8px 0 16px; }
.overline-dot { width:7px; height:7px; background:var(--tdk-accent); border-radius:2px; }
.dash-version { margin-left:auto; letter-spacing:.02em; }
.dash-hero { position:relative; min-height:260px; overflow:hidden; border-radius:19px; border:1px solid var(--tdk-border); display:flex; align-items:center; background:linear-gradient(130deg,var(--tdk-surface) 0%,var(--tdk-surface) 46%,var(--tdk-accent-muted) 100%); }
.hero-copy { position:relative; z-index:2; padding:33px 39px; max-width:66%; }
.hero-eyebrow { display:flex; gap:6px; }
.hero-copy h1 { font-size:clamp(24px,3.25vw,34px); font-weight:760; letter-spacing:-.045em; line-height:1.35; margin:16px 0 10px; }
.hero-copy h1 span { color:var(--tdk-accent); }
.hero-copy p { max-width:455px; line-height:1.85; margin:0; font-size:12px; color:var(--tdk-text-secondary); }
.hero-actions { display:flex; gap:10px; margin-top:21px; flex-wrap:wrap; }
.hero-art { position:absolute; right:0; top:0; bottom:0; width:47%; display:flex; justify-content:center; align-items:center; perspective:600px; }
.halo { position:absolute; border:1px solid color-mix(in srgb,var(--tdk-accent) 25%,transparent); border-radius:50%; }
.halo-one { width:300px; height:300px; transform:rotateX(40deg); }
.halo-two { width:420px; height:420px; transform:rotateX(35deg); }
.mock-window { background:var(--tdk-surface-raised); width:260px; height:166px; border:1px solid var(--tdk-border-strong); border-radius:12px; box-shadow:0 28px 40px #1d2d7040; transform:rotate(-7deg) rotateY(-9deg); overflow:hidden; }
.mock-top { display:flex; align-items:center; gap:4px; height:23px; border-bottom:1px solid var(--tdk-border); padding:0 9px; }
.mock-top i { background:#fa7774; width:6px; height:6px; border-radius:50%; }.mock-top i:nth-child(2){background:#eec666}.mock-top i:nth-child(3){background:#5cc997}.mock-top span { height:5px; width:65px; background:var(--tdk-border); border-radius:8px; margin:auto; }
.mock-content { display:flex; height:142px; }.mock-sidebar { width:72px; background:var(--tdk-sidebar); border-right:1px solid var(--tdk-border); padding:13px 9px; }.mock-pill { width:42px; height:9px; border-radius:4px; background:var(--tdk-accent); margin-bottom:13px; }.mock-row { width:49px; height:5px; margin:10px 0; border-radius:3px; background:var(--tdk-border-strong); }.mock-row.short {width:34px}.mock-center {padding:19px; flex:1}.mock-heading {width:80px;height:8px;background:var(--tdk-text-secondary);opacity:.4;border-radius:4px;margin-bottom:15px}.mock-cards {display:flex;gap:9px}.mock-cards div {width:68px;height:44px;background:var(--tdk-accent-muted);border:1px solid var(--tdk-border);border-radius:7px}.mock-line {width:145px;height:5px;border-radius:4px;background:var(--tdk-border);margin-top:12px}.mock-line.short{width:110px;margin-top:7px}
.float-chip { position:absolute; z-index:2; bottom:36px; right:43px; background:var(--tdk-surface); border:1px solid var(--tdk-border); border-radius:10px; box-shadow:var(--tdk-shadow); display:flex; align-items:center; gap:7px; padding:10px 13px; font-size:11px; font-weight:650; color:var(--tdk-success); transform:rotate(3deg); }
.section-heading { display:flex; justify-content:space-between; align-items:flex-end; margin:28px 0 15px; }.section-heading.second {margin-top:30px}.section-heading h2 {font-size:16px;letter-spacing:-.02em;margin:0 0 4px}.section-heading p{font-size:11px;margin:0;color:var(--tdk-text-secondary)}.section-aside{font-size:10px;letter-spacing:.08em;color:var(--tdk-text-tertiary)}
.quick-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
.quick-card { position:relative; text-align:left; display:flex; flex-direction:column; border:1px solid var(--tdk-border); border-radius:13px; background:var(--tdk-surface); color:var(--tdk-text); padding:16px; min-height:147px; transition:transform .16s,border-color .16s,box-shadow .16s; }
.quick-card:hover { transform:translateY(-2px); border-color:var(--tdk-border-strong); box-shadow:0 6px 18px #00000010; }
.quick-icon { width:38px; height:38px; border-radius:11px; display:grid; place-items:center; margin-bottom:16px; }.quick-icon.violet{background:#9774e721;color:#9774e7}.quick-icon.orange{background:#eaa54b22;color:#db922f}.quick-icon.blue{background:#6b92f622;color:#6c8fe9}.quick-icon.green{background:#4aa98320;color:#3eac82}
.quick-card strong{font-size:12px;font-weight:680}.quick-card span{font-size:11px;color:var(--tdk-text-secondary);margin-top:7px;line-height:1.5}.quick-arrow{position:absolute;top:16px;right:15px;color:var(--tdk-text-tertiary)}
.feature-list {border:1px solid var(--tdk-border);background:var(--tdk-surface);border-radius:13px;overflow:hidden}.feature-row{display:flex;align-items:center;gap:13px;padding:15px 17px;border-bottom:1px solid var(--tdk-border)}.feature-row:last-child{border:0}.feature-icon{width:35px;height:35px;border:1px solid var(--tdk-border);background:var(--tdk-canvas);display:grid;place-items:center;border-radius:9px;color:var(--tdk-text-secondary)}.feature-copy{flex:1;min-width:0}.feature-copy h3{font-size:12px;margin:0 0 5px;font-weight:650}.feature-copy p{font-size:11px;color:var(--tdk-text-secondary);margin:0;line-height:1.5}
.dash-footer{display:flex;gap:20px;align-items:center;flex-wrap:wrap;margin:24px 0 8px;font-size:10px;color:var(--tdk-text-tertiary)}.dash-footer div,.dash-footer a{display:flex;gap:6px;align-items:center}.dash-footer a{color:var(--tdk-text-secondary);text-decoration:none;margin-left:auto}
@media(max-width:1100px){.hero-copy{max-width:68%}.hero-art{opacity:.65}.quick-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:700px){.hero-copy{max-width:100%;padding:26px}.hero-art{opacity:.13}.quick-grid{grid-template-columns:1fr 1fr}.quick-card{min-height:132px}}
</style>
