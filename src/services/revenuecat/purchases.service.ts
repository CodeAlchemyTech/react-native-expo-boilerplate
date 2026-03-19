import { isExpoGo } from '@utils/expo';
import { mockPurchasesService } from './purchases.mock';
import type {
  IPurchasesService,
  PurchasesOfferings,
  PurchasesPackage,
  MakePurchaseResult,
  CustomerInfo,
  LogInResult,
} from './purchases.types';

/**
 * Real RevenueCat service using dynamic imports.
 *
 * Dynamic imports keep this module safe to parse in environments where the
 * native module is absent (Jest, Expo Go). The SDK is only loaded at
 * call-time, never at module evaluation time.
 *
 * Usage: always import `purchasesService`, never react-native-purchases directly.
 */
class RevenueCatService implements IPurchasesService {
  private static _instance: RevenueCatService;

  static getInstance(): RevenueCatService {
    if (!RevenueCatService._instance) {
      RevenueCatService._instance = new RevenueCatService();
    }
    return RevenueCatService._instance;
  }

  async configure(apiKey: string): Promise<void> {
    const { default: Purchases } = await import('react-native-purchases');
    Purchases.configure({ apiKey });
  }

  async getOfferings(): Promise<PurchasesOfferings> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.getOfferings() as Promise<PurchasesOfferings>;
  }

  async purchasePackage(pkg: PurchasesPackage): Promise<MakePurchaseResult> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.purchasePackage(pkg as never) as Promise<MakePurchaseResult>;
  }

  async restorePurchases(): Promise<CustomerInfo> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.restorePurchases() as Promise<CustomerInfo>;
  }

  async getCustomerInfo(): Promise<CustomerInfo> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.getCustomerInfo() as Promise<CustomerInfo>;
  }

  async logIn(userId: string): Promise<LogInResult> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.logIn(userId) as Promise<LogInResult>;
  }

  async logOut(): Promise<CustomerInfo> {
    const { default: Purchases } = await import('react-native-purchases');
    return Purchases.logOut() as Promise<CustomerInfo>;
  }
}

/**
 * Exported service — automatically switches based on runtime environment:
 *   Expo Go       → mockPurchasesService (safe no-op, returns empty data)
 *   Dev build     → real RevenueCat SDK
 *   Production    → real RevenueCat SDK
 *
 * Nothing in the rest of the app needs to know which implementation is active.
 */
export const purchasesService: IPurchasesService = isExpoGo
  ? mockPurchasesService
  : RevenueCatService.getInstance();
