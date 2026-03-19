import AsyncStorage from '@react-native-async-storage/async-storage';
import type { IStorage } from './storage.types';

/**
 * General-purpose key-value storage backed by AsyncStorage.
 * Use for non-sensitive data (preferences, cache, etc.).
 */
class AsyncStorageService implements IStorage {
  async getItem(key: string): Promise<string | null> {
    return AsyncStorage.getItem(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
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

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }
}

export const asyncStorageService = new AsyncStorageService();
