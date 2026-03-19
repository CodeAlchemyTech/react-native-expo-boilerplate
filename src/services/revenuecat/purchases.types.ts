/**
 * Interface that both the real RevenueCat service and the mock implement.
 * This is the only contract your hooks and features should depend on.
 */
export interface IPurchasesService {
  configure(apiKey: string): Promise<void>;
  getOfferings(): Promise<PurchasesOfferings>;
  purchasePackage(pkg: PurchasesPackage): Promise<MakePurchaseResult>;
  restorePurchases(): Promise<CustomerInfo>;
  getCustomerInfo(): Promise<CustomerInfo>;
  logIn(userId: string): Promise<LogInResult>;
  logOut(): Promise<CustomerInfo>;
}

// ── Minimal type mirrors for react-native-purchases ────────────────────────
// These mirror the types from react-native-purchases so you don't need to
// import the native module just to use the types.

export interface CustomerInfo {
  entitlements: {
    active: Record<string, EntitlementInfo>;
    all: Record<string, EntitlementInfo>;
  };
  activeSubscriptions: string[];
  allPurchasedProductIdentifiers: string[];
}

export interface EntitlementInfo {
  isActive: boolean;
  identifier: string;
  productIdentifier: string;
  expirationDate: string | null;
}

export interface PurchasesOfferings {
  current: PurchasesOffering | null;
  all: Record<string, PurchasesOffering>;
}

export interface PurchasesOffering {
  identifier: string;
  serverDescription: string;
  availablePackages: PurchasesPackage[];
  monthly: PurchasesPackage | null;
  annual: PurchasesPackage | null;
  lifetime: PurchasesPackage | null;
}

export interface PurchasesPackage {
  identifier: string;
  packageType: string;
  product: PurchasesStoreProduct;
  offeringIdentifier: string;
}

export interface PurchasesStoreProduct {
  productIdentifier: string;
  price: number;
  priceString: string;
  currencyCode: string;
  title: string;
  description: string;
}

export interface MakePurchaseResult {
  productIdentifier: string;
  customerInfo: CustomerInfo;
  transaction: unknown;
}

export interface LogInResult {
  customerInfo: CustomerInfo;
  created: boolean;
}
