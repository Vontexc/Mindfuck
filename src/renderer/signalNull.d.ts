import type { GameStateSnapshot } from '../story/nodes.types';

declare global {
  interface Window {
    signalNull: {
      getSteamName(): Promise<string>;
      unlockAchievement(id: string): Promise<boolean>;
      loadSave(): Promise<GameStateSnapshot | null>;
      saveSave(snapshot: GameStateSnapshot): Promise<boolean>;
      clearSave(): Promise<boolean>;
      setCountdownActive(active: boolean): void;
      getEndingCFlag(): Promise<boolean>;
      openExternal(url: string): void;
    };
  }
}

export {};
