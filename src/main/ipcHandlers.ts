import { ipcMain, shell } from 'electron';
import { resolveSteamName, unlockAchievement } from './steamworks';
import { loadSave, saveSave, clearSave, hasEndingCFlag } from './saveManager';

interface HandlerOpts {
  onCountdownToggle: (active: boolean) => void;
}

export function registerIpcHandlers(opts: HandlerOpts): void {
  ipcMain.handle('steam:getName', () => resolveSteamName());
  ipcMain.handle('steam:unlockAchievement', (_e, id: string) => unlockAchievement(id));
  ipcMain.handle('save:load', () => loadSave());
  ipcMain.handle('save:write', (_e, snapshot) => saveSave(snapshot));
  ipcMain.handle('save:clear', () => clearSave());
  ipcMain.handle('save:endingC', () => hasEndingCFlag());
  ipcMain.on('game:countdownToggle', (_e, active: boolean) =>
    opts.onCountdownToggle(Boolean(active)),
  );
  ipcMain.on('shell:openExternal', (_e, url: string) => {
    if (typeof url === 'string' && /^https?:\/\//.test(url)) {
      shell.openExternal(url);
    }
  });
}
