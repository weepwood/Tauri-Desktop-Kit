import type { Component } from 'vue'
import { LayoutDashboard, FolderClosed, CheckCircle2, Blocks, Settings2, NotebookTabs, Layers3, Palette, TerminalSquare, Keyboard, Search, PanelBottom, Info, Files, Clock3, HardDrive, ShieldCheck, LayoutPanelLeft, SquareMousePointer, Bell, Rocket, MoreHorizontal, Monitor, Moon, Sun, PanelRightClose, PanelRightOpen, ChevronDown, ChevronRight, CircleHelp, CircleDot, Sparkles, Github, RefreshCw, X, Plus, ArrowUpRight, SlidersHorizontal, Code2 } from 'lucide-vue-next'
export type PageId = 'dashboard' | 'files' | 'tasks' | 'components' | 'settings'
export const navigation: { id: PageId; label: string; icon: Component; description: string }[] = [
  { id: 'dashboard', label: '工作台概览', icon: LayoutDashboard, description: '快速开始与桌面概览' },
  { id: 'files', label: '文件管理演示', icon: FolderClosed, description: '文件浏览与操作占位示例' },
  { id: 'tasks', label: '任务队列演示', icon: CheckCircle2, description: '进度、状态与操作模式' },
  { id: 'components', label: 'UI 组件库', icon: Blocks, description: '桌面设计系统组件' },
  { id: 'settings', label: '偏好设置', icon: Settings2, description: '外观与工作区行为' }
]
export const icons = { LayoutDashboard, FolderClosed, CheckCircle2, Blocks, Settings2, NotebookTabs, Layers3, Palette, TerminalSquare, Keyboard, Search, PanelBottom, Info, Files, Clock3, HardDrive, ShieldCheck, LayoutPanelLeft, SquareMousePointer, Bell, Rocket, MoreHorizontal, Monitor, Moon, Sun, PanelRightClose, PanelRightOpen, ChevronDown, ChevronRight, CircleHelp, CircleDot, Sparkles, Github, RefreshCw, X, Plus, ArrowUpRight, SlidersHorizontal, Code2 }
