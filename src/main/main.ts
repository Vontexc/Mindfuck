import { app, BrowserWindow, ipcMain, shell } from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { initSaveManager, loadSave, saveSave, markEndingC } from './saveManager';
import { resolveSteamName, initSteam, shutdownSteam } from './steamworks';
import { registerIpcHandlers } from './ipcHandlers';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;
let countdownActive = false;

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 720,
    backgroundColor: '#000000',
    title: 'SIGNAL NULL',
    icon: path.join(process.env.VITE_PUBLIC ?? '', 'icon.png'),
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  if (process.env.NODE_ENV === 'development' && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

app.whenReady().then(async () => {
  initSaveManager();
  await initSteam();
  registerIpcHandlers({
    onCountdownToggle: (active) => {
      countdownActive = active;
    },
  });
  createWindow();
});

// Ending C trigger — window closed while countdown is active.
app.on('before-quit', async (event) => {
  if (countdownActive) {
    event.preventDefault();
    markEndingC();
    // Brief "fadeout" before exit (handled by save, not UI).
    setTimeout(() => app.exit(0), 200);
  }
});

app.on('window-all-closed', () => {
  shutdownSteam();
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Re-export utilities for handlers
export { loadSave, saveSave, resolveSteamName };
