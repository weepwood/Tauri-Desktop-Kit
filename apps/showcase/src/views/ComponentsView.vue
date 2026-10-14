<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import {
  UiAlert, UiBadge, UiButton, UiCard, UiCheckbox, UiDialog,
  UiInput, UiProgress, UiSelect, UiSkeleton, UiSwitch, UiTabs
} from '@tdk/ui'
import {
  Blocks, Search, MousePointerClick, Keyboard, Layers3, BadgeCheck,
  ListFilter, Settings2, LayoutTemplate, MessageSquare, Copy,
  Sparkles, ArrowRight, CircleHelp, MoveRight
} from 'lucide-vue-next'

type Category = 'all' | 'actions' | 'forms' | 'navigation' | 'feedback' | 'layout'
const categories: { id: Category; name: string; count: number }[] = [
  { id: 'all', name: '全部', count: 12 },
  { id: 'actions', name: '操作与状态', count: 3 },
  { id: 'forms', name: '表单输入', count: 3 },
  { id: 'navigation', name: '导航', count: 1 },
  { id: 'feedback', name: '反馈', count: 3 },
  { id: 'layout', name: '容器', count: 2 }
]
const catalog = [
  { id: 'button', title: 'Button', category: 'actions' },
  { id: 'badge', title: 'Badge', category: 'actions' },
  { id: 'switch', title: 'Switch', category: 'actions' },
  { id: 'input', title: 'Input', category: 'forms' },
  { id: 'select', title: 'Select', category: 'forms' },
  { id: 'checkbox', title: 'Checkbox', category: 'forms' },
  { id: 'tabs', title: 'Tabs', category: 'navigation' },
  { id: 'progress', title: 'Progress', category: 'feedback' },
  { id: 'alert', title: 'Alert', category: 'feedback' },
  { id: 'dialog', title: 'Dialog', category: 'feedback' },
  { id: 'card', title: 'Card', category: 'layout' },
  { id: 'skeleton', title: 'Skeleton', category: 'layout' }
] as const
const search = ref('')
const category = ref<Category>('all')
const visibleCount = computed(() => catalog.filter(entry => matches(entry.id, entry.category)).length)
function matches(id: string, group: Exclude<Category, 'all'>) {
  const found = catalog.find(entry => entry.id === id)
  return (category.value === 'all' || category.value === group)
    && (!search.value.trim() || (found?.title.toLowerCase().includes(search.value.trim().toLowerCase()) || id.includes(search.value.trim().toLowerCase())))
}
const projectName = ref('')
const email = ref('')
const emailError = computed(() => email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? '请输入有效邮箱地址' : '')
const selectedPlatform = ref('desktop')
const platformOptions = [
  { label: '桌面应用 · Tauri 2', value: 'desktop' },
  { label: 'Web 工作台', value: 'web' },
  { label: '移动端（规划中）', value: 'mobile', disabled: true }
]
const notifications = ref(true)
const agreed = ref(false)
const activeTab = ref('preview')
const tabs = [{ value: 'preview', label: '预览' }, { value: 'code', label: '接入说明' }, { value: 'disabled', label: '敬请期待', disabled: true }]
const progress = ref(64)
const dialogOpen = ref(false)
const busy = ref(false)
const notice = ref('')
let noticeTimer: ReturnType<typeof setTimeout> | undefined
let taskTimer: ReturnType<typeof setTimeout> | undefined
function toast(message: string) {
  notice.value = message
  if (noticeTimer) clearTimeout(noticeTimer)
  noticeTimer = setTimeout(() => { notice.value = '' }, 3000)
}
function startTask() {
  if (busy.value) return
  busy.value = true
  taskTimer = setTimeout(() => {
    busy.value = false
    progress.value = progress.value >= 100 ? 15 : Math.min(100, progress.value + 12)
    toast('演示进度已更新')
  }, 650)
}
async function copyExample() {
  const snippet = "import { UiButton, UiInput } from '@tdk/ui'"
  try {
    await navigator.clipboard.writeText(snippet)
    toast('导入示例已复制')
  } catch { toast('无法访问剪贴板，请在 docs/UI-KIT.md 查看示例') }
}
onBeforeUnmount(() => {
  if (noticeTimer) clearTimeout(noticeTimer)
  if (taskTimer) clearTimeout(taskTimer)
})
</script>
<template>
  <div class="page-scroller kit-page">
    <div class="kit-hero">
      <div class="kit-hero__copy">
        <span class="kit-eyebrow"><Sparkles :size="13" /> TDK / DESIGN SYSTEM / 0.2</span>
        <h1>统一构建，<span>保持原生。</span></h1>
        <p>基于 Vue 3、Reka UI 与语义化 CSS Token 的桌面组件库。将项目中的重复控件沉淀为可组合的基础组件，兼顾键盘操作、深色主题与不同界面密度。</p>
        <div class="kit-hero__actions">
          <UiButton variant="primary" @click="category = 'all'; search = ''"><Blocks :size="15" /> 浏览组件 <ArrowRight :size="14" /></UiButton>
          <UiButton @click="copyExample"><Copy :size="14" /> 复制导入示例</UiButton>
        </div>
      </div>
      <div class="kit-hero__art" aria-hidden="true">
        <div class="kit-float kit-float--one"><span class="kit-float__dot" /> Surface / Fluent</div>
        <div class="kit-float kit-float--two"><span class="kit-bubble">Aa</span><span class="kit-float__lines"><i /><i /></span></div>
        <div class="kit-float kit-float--three"><span class="kit-progress-pill" /><span class="kit-progress-pill short" /></div>
      </div>
    </div>

    <div class="kit-stats">
      <div><strong>12</strong><span>基础组件</span></div>
      <div><strong>5</strong><span>组件分类</span></div>
      <div><strong>2</strong><span>亮色 / 暗色主题</span></div>
      <div><strong>0</strong><span>Tailwind 依赖</span></div>
    </div>

    <div class="kit-toolbar">
      <div class="kit-toolbar__title"><span class="kit-section-icon"><LayoutTemplate :size="18" /></span><div><h2>组件目录</h2><p>可操作的状态与用法示例</p></div></div>
      <label class="kit-search"><Search :size="16" /><input v-model="search" aria-label="搜索 UI 组件" placeholder="搜索组件名称..." /></label>
    </div>
    <div class="kit-filters" aria-label="组件分类">
      <button v-for="item in categories" :key="item.id" type="button" class="kit-filter" :class="{ active: category === item.id }" :aria-pressed="category === item.id" @click="category = item.id">{{ item.name }}<span>{{ item.count }}</span></button>
    </div>
    <p class="kit-result">当前显示 <strong>{{ visibleCount }}</strong> / 12 个组件</p>
    <div class="kit-grid">
      <section v-if="matches('button','actions')" class="kit-panel">
        <header><div class="kit-panel__name"><MousePointerClick :size="18" /><div><h3>Button</h3><span>操作 / 按钮</span></div></div><UiBadge tone="accent">Actions</UiBadge></header>
        <p>多层级操作、加载状态与禁用反馈。</p>
        <div class="kit-playground kit-line">
          <UiButton variant="primary" @click="toast('主要操作已触发')">主要操作 <MoveRight :size="14" /></UiButton>
          <UiButton @click="toast('次要操作已触发')">次要操作</UiButton>
          <UiButton variant="ghost" @click="toast('轻量操作已触发')">幽灵按钮</UiButton>
          <UiButton variant="danger" size="sm" @click="toast('危险操作演示：未删除任何数据')">危险操作</UiButton>
          <UiButton :loading="busy" size="sm" @click="startTask">模拟运行</UiButton>
        </div>
        <footer><Keyboard :size="13" /> 支持 Focus、Disabled、Loading 状态</footer>
      </section>
      <section v-if="matches('badge','actions')" class="kit-panel">
        <header><div class="kit-panel__name"><BadgeCheck :size="18" /><div><h3>Badge</h3><span>操作 / 状态</span></div></div><UiBadge>Display</UiBadge></header>
        <p>任务和表格内的语义状态，不依赖写死的颜色值。</p>
        <div class="kit-playground kit-line">
          <UiBadge>默认</UiBadge><UiBadge tone="accent">进行中</UiBadge><UiBadge tone="success">已完成</UiBadge><UiBadge tone="warning">待处理</UiBadge><UiBadge tone="danger">失败</UiBadge>
        </div>
        <footer><Layers3 :size="13" /> 统一 Design Tokens</footer>
      </section>
      <section v-if="matches('switch','actions')" class="kit-panel">
        <header><div class="kit-panel__name"><Settings2 :size="18" /><div><h3>Switch</h3><span>操作 / 开关</span></div></div><UiBadge>Reka UI</UiBadge></header>
        <p>面向即时切换的设置场景。</p>
        <div class="kit-playground"><UiSwitch v-model="notifications" label="启用桌面通知"><span>启用桌面通知（演示状态）</span></UiSwitch><div class="kit-value">当前：{{ notifications ? '已启用' : '已停用' }}</div></div>
        <footer><CircleHelp :size="13" /> 不会实际请求系统通知权限</footer>
      </section>
      <section v-if="matches('input','forms')" class="kit-panel">
        <header><div class="kit-panel__name"><Keyboard :size="18" /><div><h3>Input</h3><span>表单 / 文本输入</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>标签、辅助说明、前后缀和校验提示。</p>
        <div class="kit-playground kit-form">
          <UiInput v-model="projectName" label="项目名称" placeholder="例如 My Desktop App" hint="用于新建项目和导航标题">
            <template #prefix><Blocks :size="14" /></template>
          </UiInput>
          <UiInput v-model="email" label="通知邮箱" type="email" placeholder="name@example.com" :error="emailError" />
        </div>
        <footer><Keyboard :size="13" /> 原生输入与 aria-describedby</footer>
      </section>
      <section v-if="matches('select','forms')" class="kit-panel">
        <header><div class="kit-panel__name"><ListFilter :size="18" /><div><h3>Select</h3><span>表单 / 单项选择</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>保留原生键盘和辅助技术行为。</p>
        <div class="kit-playground kit-form"><UiSelect v-model="selectedPlatform" label="目标运行环境" :options="platformOptions" hint="移动端选项目前不可选择" /><div class="kit-value">选中值：{{ selectedPlatform }}</div></div>
        <footer><Keyboard :size="13" /> 原生 Select，支持禁用选项</footer>
      </section>
      <section v-if="matches('checkbox','forms')" class="kit-panel">
        <header><div class="kit-panel__name"><BadgeCheck :size="18" /><div><h3>Checkbox</h3><span>表单 / 多选项</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>适用于批量选择、授权确认与偏好设置。</p>
        <div class="kit-playground kit-form"><UiCheckbox v-model="agreed" label="启用实验性组件" description="演示用途：不修改本地偏好" /><UiCheckbox label="不可操作的选项" disabled /><div class="kit-value">{{ agreed ? '已勾选' : '未勾选' }}</div></div>
        <footer><Keyboard :size="13" /> 支持空格键和原生焦点管理</footer>
      </section>
      <section v-if="matches('tabs','navigation')" class="kit-panel">
        <header><div class="kit-panel__name"><Layers3 :size="18" /><div><h3>Tabs</h3><span>导航 / 标签页</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>具有方向键切换、Home / End 和正确的 Tab 语义。</p>
        <div class="kit-playground"><UiTabs v-model="activeTab" :items="tabs" label="组件演示标签"><template #default="{ selected }"><div class="kit-tab-content">{{ selected === 'preview' ? '组件通过 props / slots 组合，适配桌面 UI。' : '从 @tdk/ui 导入组件，并加载 @tdk/tokens/styles.css。' }}</div></template></UiTabs></div>
        <footer><Keyboard :size="13" /> ← → Home End</footer>
      </section>
      <section v-if="matches('progress','feedback')" class="kit-panel">
        <header><div class="kit-panel__name"><MoveRight :size="18" /><div><h3>Progress</h3><span>反馈 / 进度</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>任务完成率展示，数值自动限制在合法范围。</p>
        <div class="kit-playground kit-form"><UiProgress label="同步示例任务" :value="progress" show-value /><UiProgress label="已完成步骤" :value="3" :max="4" tone="success" show-value /><div class="kit-line"><UiButton size="sm" @click="progress = Math.max(0, progress - 10)">-10%</UiButton><UiButton size="sm" @click="progress = Math.min(100, progress + 10)">+10%</UiButton></div></div>
        <footer><CircleHelp :size="13" /> 带 aria-valuenow 的进度语义</footer>
      </section>
      <section v-if="matches('alert','feedback')" class="kit-panel">
        <header><div class="kit-panel__name"><MessageSquare :size="18" /><div><h3>Alert</h3><span>反馈 / 提示</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>对成功、风险和错误信息使用一致语义。</p>
        <div class="kit-playground kit-form"><UiAlert tone="success" title="配置已保存">所有设置已写入演示状态。</UiAlert><UiAlert tone="warning" title="检查依赖">运行原生构建前请配置 Rust 工具链。</UiAlert></div>
        <footer><CircleHelp :size="13" /> 危险提示使用 alert 角色</footer>
      </section>
      <section v-if="matches('dialog','feedback')" class="kit-panel">
        <header><div class="kit-panel__name"><MessageSquare :size="18" /><div><h3>Dialog</h3><span>反馈 / 对话框</span></div></div><UiBadge>Reka UI</UiBadge></header>
        <p>具有 Esc、焦点管理与遮罩的模态对话框。</p>
        <div class="kit-playground kit-line"><UiButton variant="primary" @click="dialogOpen = true">打开确认对话框 <ArrowRight :size="14" /></UiButton></div>
        <footer><Keyboard :size="13" /> Esc 关闭，焦点返回触发控件</footer>
      </section>
      <section v-if="matches('card','layout')" class="kit-panel">
        <header><div class="kit-panel__name"><LayoutTemplate :size="18" /><div><h3>Card</h3><span>布局 / 容器</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>组合头部、内容与底部操作区域。</p>
        <div class="kit-playground"><UiCard title="部署概况" description="本地项目 / Demo Preview"><div class="kit-card-row"><span class="kit-dot" /> 所有预览服务均可用 <UiBadge tone="success">Healthy</UiBadge></div><template #footer><span class="kit-card-footer">最后更新：刚刚（演示数据）</span></template></UiCard></div>
        <footer><Layers3 :size="13" /> 支持 Header、Footer Slots</footer>
      </section>
      <section v-if="matches('skeleton','layout')" class="kit-panel">
        <header><div class="kit-panel__name"><LayoutTemplate :size="18" /><div><h3>Skeleton</h3><span>布局 / 加载占位</span></div></div><UiBadge tone="success">New</UiBadge></header>
        <p>内容加载前的低干扰视觉占位。</p>
        <div class="kit-playground kit-skeleton"><UiSkeleton width="40px" height="40px" circle /><div class="kit-skeleton__text"><UiSkeleton width="62%" height="12px" /><UiSkeleton width="94%" height="10px" /><UiSkeleton width="75%" height="10px" /></div></div>
        <footer><CircleHelp :size="13" /> 尊重减少动画偏好</footer>
      </section>
    </div>
    <div v-if="!visibleCount" class="kit-empty"><Search :size="23" /><strong>没有匹配的组件</strong><p>尝试更换搜索词或分类。</p><UiButton size="sm" @click="search = ''; category = 'all'">清除筛选</UiButton></div>
    <div class="kit-next"><span class="kit-section-icon"><Blocks :size="19" /></span><div><strong>组件目录将持续扩展</strong><p>下一阶段：Dropdown / Context Menu / Tree View / 虚拟表格，以及打包发布与自动化测试。</p></div><UiBadge tone="accent">Roadmap</UiBadge></div>
    <div v-if="notice" class="kit-toast" role="status">{{ notice }}</div>
    <UiDialog v-model:open="dialogOpen" title="新建项目" description="这是一个模态对话框的实际交互示例，不会创建真实文件。">
      <UiInput v-model="projectName" label="项目名称" placeholder="请输入项目名称" />
      <template #footer>
        <UiButton @click="dialogOpen = false">取消</UiButton>
        <UiButton variant="primary" @click="dialogOpen = false; toast('已确认演示操作（未写入文件）')">确认</UiButton>
      </template>
    </UiDialog>
  </div>
</template>
<style scoped>
.kit-page { max-width:1170px; margin:auto; padding-bottom:34px; }
.kit-hero { position:relative; display:flex; overflow:hidden; min-height:218px; padding:29px 35px; border:1px solid var(--tdk-border); border-radius:18px; background:radial-gradient(ellipse at 85% 15%,var(--tdk-accent-muted),transparent 65%),var(--tdk-surface); }
.kit-hero__copy { position:relative; z-index:1; max-width:590px; }
.kit-eyebrow { display:inline-flex; align-items:center; gap:7px; font-size:10px; font-weight:700; letter-spacing:.13em; color:var(--tdk-accent); }
.kit-hero h1 { font-size:29px; letter-spacing:-.05em; line-height:1.25; margin:17px 0 10px; }
.kit-hero h1 span { color:var(--tdk-accent); }
.kit-hero p { max-width:550px; font-size:12px; line-height:1.85; color:var(--tdk-text-secondary); margin:0; }
.kit-hero__actions { display:flex; flex-wrap:wrap; gap:9px; margin-top:20px; }
.kit-hero__art { position:absolute; right:6%; top:19px; width:270px; height:195px; pointer-events:none; opacity:.92; }
.kit-float { position:absolute; display:flex; gap:10px; align-items:center; border:1px solid var(--tdk-border); background:var(--tdk-surface-raised); color:var(--tdk-text); border-radius:12px; box-shadow:var(--tdk-shadow); }
.kit-float--one { right:7px; top:19px; padding:12px 15px; font-size:10px; }
.kit-float__dot { height:10px; width:10px; border-radius:50%; background:var(--tdk-success); }
.kit-float--two { top:67px; right:70px; width:150px; padding:14px; transform:rotate(-8deg); }
.kit-bubble { width:38px; height:38px; display:grid; place-items:center; background:var(--tdk-accent-muted); color:var(--tdk-accent); border-radius:9px; font-weight:700; font-size:17px; }
.kit-float__lines { display:grid; flex:1; gap:7px; }
.kit-float__lines i,.kit-progress-pill { display:block; height:7px; background:var(--tdk-border-strong); border-radius:20px; }
.kit-float__lines i:last-child { width:65%; }
.kit-float--three { right:0; bottom:16px; width:154px; height:43px; padding:12px; transform:rotate(6deg); }
.kit-progress-pill { width:80px; background:var(--tdk-accent); opacity:.7; }
.kit-progress-pill.short { width:30px; background:var(--tdk-border); }
.kit-stats { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; margin:17px 0 27px; border:1px solid var(--tdk-border); background:var(--tdk-border); overflow:hidden; border-radius:12px; }
.kit-stats>div { display:grid; gap:5px; background:var(--tdk-surface); padding:16px 21px; }
.kit-stats strong { font-size:19px; line-height:1.2; }
.kit-stats span { font-size:11px; color:var(--tdk-text-secondary); }
.kit-toolbar { display:flex; justify-content:space-between; align-items:center; gap:16px; }
.kit-toolbar__title { display:flex; align-items:center; gap:12px; }
.kit-section-icon { display:grid; width:36px; height:36px; place-items:center; background:var(--tdk-accent-muted); color:var(--tdk-accent); border-radius:10px; flex-shrink:0; }
.kit-toolbar h2 { font-size:17px; margin:0 0 3px; }
.kit-toolbar p { margin:0; color:var(--tdk-text-tertiary); font-size:11px; }
.kit-search { display:flex; align-items:center; gap:8px; width:235px; min-width:0; height:35px; border:1px solid var(--tdk-border-strong); background:var(--tdk-surface); color:var(--tdk-text-secondary); border-radius:9px; padding:0 10px; }
.kit-search:focus-within { outline:2px solid var(--tdk-accent-muted); border-color:var(--tdk-accent); }
.kit-search input { outline:0; border:0; background:transparent; width:100%; min-width:0; color:var(--tdk-text); font-size:12px; }
.kit-search input:focus-visible { outline:0; }
.kit-filters { display:flex; gap:8px; margin-top:20px; flex-wrap:wrap; }
.kit-filter { padding:8px 12px; border:1px solid var(--tdk-border); border-radius:8px; background:var(--tdk-surface); color:var(--tdk-text-secondary); font-size:11px; display:flex; align-items:center; gap:9px; }
.kit-filter span { font-size:10px; opacity:.65; }
.kit-filter.active { background:var(--tdk-accent-muted); color:var(--tdk-accent); border-color:color-mix(in srgb,var(--tdk-accent) 20%,var(--tdk-border)); font-weight:700; }
.kit-filter:hover:not(.active) { background:var(--tdk-surface-hover); }
.kit-result { font-size:11px; color:var(--tdk-text-tertiary); margin:15px 0 10px; }
.kit-result strong { color:var(--tdk-text); }
.kit-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:14px; }
.kit-panel { min-width:0; display:flex; flex-direction:column; background:var(--tdk-surface); border:1px solid var(--tdk-border); border-radius:13px; padding:17px 19px 0; }
.kit-panel header { display:flex; align-items:center; justify-content:space-between; gap:14px; }
.kit-panel__name { display:flex; align-items:center; gap:10px; color:var(--tdk-accent); }
.kit-panel__name h3 { font-size:13px; line-height:1; margin:0 0 5px; color:var(--tdk-text); }
.kit-panel__name span { font-size:10px; color:var(--tdk-text-tertiary); }
.kit-panel>p { margin:13px 0 15px; color:var(--tdk-text-secondary); font-size:11px; line-height:1.6; }
.kit-playground { min-width:0; flex:1; margin-bottom:17px; }
.kit-line { display:flex; align-items:center; gap:8px; flex-wrap:wrap; }
.kit-form { display:grid; align-content:start; gap:14px; }
.kit-value { color:var(--tdk-text-tertiary); font-size:10px; }
.kit-panel footer { display:flex; align-items:center; gap:6px; font-size:10px; color:var(--tdk-text-tertiary); border-top:1px solid var(--tdk-border); padding:10px 0; margin-top:auto; }
.kit-tab-content { font-size:11px; color:var(--tdk-text-secondary); line-height:1.65; }
.kit-card-row { display:flex; align-items:center; flex-wrap:wrap; gap:7px; font-size:11px; color:var(--tdk-text-secondary); }
.kit-dot { width:8px; height:8px; border-radius:50%; background:var(--tdk-success); }
.kit-card-footer { font-size:10px; color:var(--tdk-text-tertiary); }
.kit-skeleton { display:flex; align-items:flex-start; gap:13px; padding:13px; border:1px solid var(--tdk-border); border-radius:10px; }
.kit-skeleton__text { flex:1; display:grid; gap:8px; }
.kit-next { display:flex; align-items:center; gap:14px; margin-top:18px; padding:16px 18px; background:var(--tdk-surface); border:1px solid var(--tdk-border); border-radius:12px; }
.kit-next div { flex:1; }
.kit-next strong { font-size:12px; }
.kit-next p { margin:6px 0 0; font-size:11px; line-height:1.5; color:var(--tdk-text-secondary); }
.kit-toast { position:fixed; left:50%; bottom:55px; transform:translateX(-50%); z-index:80; padding:10px 17px; background:var(--tdk-text); color:var(--tdk-surface); box-shadow:var(--tdk-shadow); border-radius:10px; font-size:12px; }
.kit-empty { display:grid; justify-items:center; gap:10px; color:var(--tdk-text-secondary); border:1px dashed var(--tdk-border-strong); border-radius:12px; padding:36px; }
.kit-empty strong { font-size:13px; color:var(--tdk-text); }
.kit-empty p { margin:0; font-size:11px; }
@media(max-width:1160px) { .kit-hero__art { right:-20px; opacity:.28; } }
@media(max-width:860px) { .kit-grid { grid-template-columns:1fr; } .kit-stats { grid-template-columns:repeat(2,1fr); } .kit-hero { padding:22px; } .kit-hero h1 { font-size:24px; } }
@media(max-width:570px) { .kit-toolbar { align-items:stretch; flex-direction:column; } .kit-search { width:100%; } .kit-next { flex-wrap:wrap; } .kit-stats>div { padding:13px; } }
</style>
