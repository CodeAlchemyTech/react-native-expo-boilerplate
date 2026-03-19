import type {
  IPurchasesService,
  PurchasesOfferings,
  PurchasesPackage,
  MakePurchaseResult,
  CustomerInfo,
  LogInResult,
} from './purchases.types';

const MOCK_CUSTOMER_INFO: CustomerInfo = {
  entitlements: { active: {}, all: {} },
  activeSubscriptions: [],
  allPurchasedProductIdentifiers: [],
};

const MOCK_OFFERINGS: PurchasesOfferings = {
  current: {
    identifier: 'default',
    serverDescription: 'Default offering',
    availablePackages: [],
    monthly: null,
    annual: null,
    lifetime: null,
  },
  all: {},
};

/**
 * Mock RevenueCat service for use in Jest tests and Storybook.
 * Swap with the real service in your test setup:
 *
 *   jest.mock('@services/revenuecat', () => ({
 *     purchasesService: mockPurchasesService,
 *   }));
 */
export const mockPurchasesService: IPurchasesService = {
  configure: async (_apiKey: string) => Promise.resolve(),

  getOfferings: async () => MOCK_OFFERINGS,

  purchasePackage: async (_pkg: PurchasesPackage): Promise<MakePurchaseResult> => ({
    productIdentifier: 'mock_product',
    customerInfo: {
      ...MOCK_CUSTOMER_INFO,
      entitlements: {
        active: {
          premium: {
            isActive: true,
            identifier: 'premium',
            productIdentifier: 'mock_product',
            expirationDate: null,
          },
        },
        all: {},
      },
    },
    transaction: {},
  }),

  restorePurchases: async () => MOCK_CUSTOMER_INFO,

  getCustomerInfo: async () => MOCK_CUSTOMER_INFO,

  logIn: async (userId: string): Promise<LogInResult> => ({
    customerInfo: MOCK_CUSTOMER_INFO,
    created: false,
  }),

  logOut: async () => MOCK_CUSTOMER_INFO,
};
