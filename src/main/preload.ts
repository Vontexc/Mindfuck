import { contextBridge, ipcRenderer } from 'electron';
import type { GameStateSnapshot } from '../story/nodes.types';

const api = {
  getSteamName: (): Promise<string> => ipcRenderer.invoke('steam:getName'),
  unlockAchievement: (id: string): Promise<boolean> =>
    ipcRenderer.invoke('steam:unlockAchievement', id),
  loadSave: (): Promise<GameStateSnapshot | null> => ipcRenderer.invoke('save:load'),
  saveSave: (snapshot: GameStateSnapshot): Promise<boolean> =>
    ipcRenderer.invoke('save:write', snapshot),
  clearSave: (): Promise<boolean> => ipcRenderer.invoke('save:clear'),
  setCountdownActive: (active: boolean): void => {
    ipcRenderer.send('game:countdownToggle', active);
  },
  getEndingCFlag: (): Promise<boolean> => ipcRenderer.invoke('save:endingC'),
  openExternal: (url: string): void => {
    ipcRenderer.send('shell:openExternal', url);
  },
};

contextBridge.exposeInMainWorld('signalNull', api);

export type SignalNullAPI = typeof api;
