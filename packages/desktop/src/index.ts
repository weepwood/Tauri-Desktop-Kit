import { isTauri } from '@tauri-apps/api/core'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { load } from '@tauri-apps/plugin-store'

export type DesktopPlatform = 'windows' | 'macos' | 'linux' | 'browser'
export const runningInTauri = () => typeof window !== 'undefined' && isTauri()

export function platform(): DesktopPlatform {
  if (!runningInTauri()) return 'browser'
  const name = navigator.userAgent.toLowerCase()
  if (name.includes('windows')) return 'windows'
  if (name.includes('mac')) return 'macos'
  return 'linux'
}

export interface WindowService {
  minimize(): Promise<void>
  toggleMaximize(): Promise<void>
  close(): Promise<void>
}

export const desktopWindow: WindowService = {
  async minimize() { if (runningInTauri()) await getCurrentWindow().minimize() },
  async toggleMaximize() { if (runningInTauri()) await getCurrentWindow().toggleMaximize() },
  async close() { if (runningInTauri()) await getCurrentWindow().close() }
}

// The browser adapter keeps the Showcase usable without native permissions.
// The Tauri adapter is the source of truth in packaged desktop apps.
export const desktopSettings = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      if (runningInTauri()) {
        const store = await load('preferences.json', { autoSave: true })
        return (await store.get<T>(key)) ?? fallback
      }
      const raw = localStorage.getItem(`tdk:${key}`)
      return raw === null ? fallback : JSON.parse(raw) as T
    } catch (error) {
      console.warn('无法读取设置，已回退默认值', error)
      return fallback
    }
  },
  async set<T>(key: string, value: T): Promise<void> {
    if (runningInTauri()) {
      const store = await load('preferences.json', { autoSave: true })
      await store.set(key, value)
      await store.save()
    } else {
      localStorage.setItem(`tdk:${key}`, JSON.stringify(value))
    }
  }
}
