import * as SecureStore from 'expo-secure-store';
import type { IStorage } from './storage.types';

/**
 * Encrypted key-value storage backed by expo-secure-store.
 * Use for sensitive data: tokens, credentials, PII.
 * Note: SecureStore is not available on web.
 */
class SecureStorageService implements IStorage {
  async getItem(key: string): Promise<string | null> {
    return SecureStore.getItemAsync(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await SecureStore.setItemAsync(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await SecureStore.deleteItemAsync(key);
  }

  async getObject<T>(key: string): Promise<T | null> {
    const raw = await this.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  async setObject<T>(key: string, value: T): Promise<void> {
    await this.setItem(key, JSON.stringify(value));
  }
}

export const secureStorageService = new SecureStorageService();
