import { app } from 'electron';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { GameStateSnapshot } from '../story/nodes.types';

const ALGORITHM = 'aes-256-gcm';
// In production: derive the key from a server-bound or Steam-bound seed.
// For development we use a deterministic local key — manipulation-resistant
// but NOT cryptographically secret. This is intentional for a single-player
// narrative game where saves should be tamper-evident.
const KEY = crypto.createHash('sha256').update('signal_null_v1_dev_key').digest();
const IV_LENGTH = 12;
const TAG_LENGTH = 16;

let savePath = '';
let endingCPath = '';

export function initSaveManager(): void {
  const dir = path.join(app.getPath('userData'), 'saves');
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  savePath = path.join(dir, 'progress.dat');
  endingCPath = path.join(dir, 'ending_c.flag');
}

export function loadSave(): GameStateSnapshot | null {
  if (!existsSync(savePath)) return null;
  try {
    const blob = readFileSync(savePath);
    const iv = blob.subarray(0, IV_LENGTH);
    const tag = blob.subarray(IV_LENGTH, IV_LENGTH + TAG_LENGTH);
    const data = blob.subarray(IV_LENGTH + TAG_LENGTH);
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(data), decipher.final()]);
    return JSON.parse(decrypted.toString('utf8')) as GameStateSnapshot;
  } catch (err) {
    console.error('[saveManager] Failed to load save:', err);
    return null;
  }
}

export function saveSave(snapshot: GameStateSnapshot): boolean {
  try {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    const plain = Buffer.from(JSON.stringify(snapshot), 'utf8');
    const encrypted = Buffer.concat([cipher.update(plain), cipher.final()]);
    const tag = cipher.getAuthTag();
    writeFileSync(savePath, Buffer.concat([iv, tag, encrypted]));
    return true;
  } catch (err) {
    console.error('[saveManager] Failed to write save:', err);
    return false;
  }
}

export function clearSave(): boolean {
  try {
    if (existsSync(savePath)) writeFileSync(savePath, Buffer.alloc(0));
    return true;
  } catch {
    return false;
  }
}

export function markEndingC(): void {
  try {
    writeFileSync(endingCPath, String(Date.now()), 'utf8');
  } catch (err) {
    console.error('[saveManager] Failed to mark ending C:', err);
  }
}

export function hasEndingCFlag(): boolean {
  return existsSync(endingCPath);
}
