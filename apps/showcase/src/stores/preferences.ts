import { defineStore } from 'pinia'
import { watch, ref, computed } from 'vue'
import { desktopSettings } from '@tdk/desktop'
export type Theme = 'system' | 'light' | 'dark'
export type Density = 'compact' | 'normal' | 'comfortable'

export const usePreferences = defineStore('preferences', () => {
  const theme = ref<Theme>('system')
  const density = ref<Density>('normal')
  const sidebarCollapsed = ref(false)
  const inspectorVisible = ref(true)
  const bottomVisible = ref(false)
  const sidebarWidth = ref(250)
  const inspectorWidth = ref(286)
  const bottomHeight = ref(200)
  const loaded = ref(false)
  const systemDark = ref(false)
  const activeTheme = computed(() => theme.value === 'system' ? (systemDark.value ? 'dark' : 'light') : theme.value)
  let media: MediaQueryList | null = null

  function applyAppearance() {
    document.documentElement.dataset.theme = activeTheme.value
    document.documentElement.dataset.density = density.value
  }
  function attachSystemTheme() {
    media = matchMedia('(prefers-color-scheme: dark)')
    systemDark.value = media.matches
    media.addEventListener('change', onSystemThemeChange)
  }
  function onSystemThemeChange(event: MediaQueryListEvent) { systemDark.value = event.matches }
  async function initialize() {
    if (loaded.value) return
    attachSystemTheme()
    const settings = await desktopSettings.get('preferences', {
      theme: 'system' as Theme, density: 'normal' as Density,
      sidebarCollapsed: false, inspectorVisible: true, bottomVisible: false,
      sidebarWidth: 250, inspectorWidth: 286, bottomHeight: 200
    })
    theme.value = ['system', 'light', 'dark'].includes(settings.theme) ? settings.theme : 'system'
    density.value = ['compact','normal','comfortable'].includes(settings.density) ? settings.density : 'normal'
    sidebarCollapsed.value = settings.sidebarCollapsed
    inspectorVisible.value = settings.inspectorVisible
    bottomVisible.value = settings.bottomVisible
    sidebarWidth.value = Math.max(190, Math.min(380, settings.sidebarWidth || 250))
    inspectorWidth.value = Math.max(240, Math.min(420, settings.inspectorWidth || 286))
    bottomHeight.value = Math.max(130, Math.min(400, settings.bottomHeight || 200))
    loaded.value = true
    applyAppearance()
  }
  watch([theme, density, systemDark], applyAppearance, { immediate: true })
  let saveTimer: ReturnType<typeof setTimeout> | undefined
  watch([theme, density, sidebarCollapsed, inspectorVisible, bottomVisible, sidebarWidth, inspectorWidth, bottomHeight], () => {
    if (!loaded.value) return
    clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      desktopSettings.set('preferences', {
        theme: theme.value, density: density.value, sidebarCollapsed: sidebarCollapsed.value,
        inspectorVisible: inspectorVisible.value, bottomVisible: bottomVisible.value,
        sidebarWidth: sidebarWidth.value, inspectorWidth: inspectorWidth.value, bottomHeight: bottomHeight.value
      }).catch(error => console.error('偏好设置持久化失败', error))
    }, 260)
  })
  return { theme, density, sidebarCollapsed, inspectorVisible, bottomVisible, sidebarWidth, inspectorWidth, bottomHeight, activeTheme, loaded, initialize }
})
