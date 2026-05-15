// Steam integration via greenworks (Node Steamworks wrapper).
//
// greenworks is optional — when not present (development, non-Steam builds),
// the resolver falls back to OS username or "KAPITÄN". Drop the native
// greenworks binary into ./native/greenworks for the production build.

import os from 'node:os';

interface Greenworks {
  init(): boolean;
  initAPI?(): boolean;
  getSteamId(): { screenName: string; steamId: string };
  activateAchievement(id: string, cb: (err: Error | null) => void): void;
  shutdown?(): void;
}

let greenworks: Greenworks | null = null;

export async function initSteam(): Promise<void> {
  try {
    // Dynamic import — keeps build healthy when greenworks isn't present.
    const mod = await import('greenworks').catch(() => null);
    if (!mod) return;
    const gw = (mod as any).default ?? mod;
    const ok = gw.init ? gw.init() : gw.initAPI?.();
    if (ok) {
      greenworks = gw;
      console.log('[steam] Greenworks initialized.');
    }
  } catch (err) {
    console.log('[steam] Greenworks unavailable — running in standalone mode.');
  }
}

export function resolveSteamName(): string {
  if (greenworks) {
    try {
      const info = greenworks.getSteamId();
      if (info?.screenName) return info.screenName;
    } catch {
      /* fall through */
    }
  }
  return os.userInfo().username || 'KAPITÄN';
}

export function unlockAchievement(id: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (!greenworks) return resolve(false);
    greenworks.activateAchievement(id, (err) => resolve(!err));
  });
}

export function shutdownSteam(): void {
  if (greenworks?.shutdown) {
    try {
      greenworks.shutdown();
    } catch {
      /* ignore */
    }
  }
}
