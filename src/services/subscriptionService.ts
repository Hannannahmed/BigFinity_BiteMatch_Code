import { CapacitorInAppPurchase } from '@adplorg/capacitor-in-app-purchase';
import { Capacitor } from '@capacitor/core';

// App Store Product IDs (must match exactly in App Store Connect)
export const SUBSCRIPTION_PRODUCTS = {
  MONTHLY: 'bitematch.subscription.monthly',
  YEARLY: 'bitematch.subscription.yearly'
} as const;

export interface SubscriptionProduct {
  productId: string;
  price: string;
  localizedPrice: string;
  title: string;
  description: string;
  period: 'monthly' | 'yearly';
}

export interface SubscriptionStatus {
  isActive: boolean;
  productId: string | null;
  expirationDate: string | null;
  isInTrial: boolean;
  trialEndDate: string | null;
}

class SubscriptionService {
  // Your exact selectPlan function
  async selectPlan(planType: 'monthly' | 'yearly'): Promise<boolean> {
    try {
      const productId = planType === "monthly"
        ? "bitematch.subscription.monthly"
        : "bitematch.subscription.yearly";

      if (Capacitor.isNativePlatform()) {
        // Get product details
        const { products } = await CapacitorInAppPurchase.getProducts({
          productIds: [productId],
        });

        if (products.length > 0) {
          // Initiate the purchase
          const result = await CapacitorInAppPurchase.purchaseProduct({
            productId,
            referenceUUID: crypto.randomUUID(), // you can store/log this ID if needed
          })
          console.log("✅ Purchase success:", result);

          // Activate subscription in app
          this.activateSubscription(productId);
          return true;
        } else {
          console.error("⚠️ Product not found. Check App Store Connect IDs.");
          return false;
        }
      } else {
        // Web simulation
        console.log(`Simulating purchase of ${productId}`);
        await new Promise(resolve => setTimeout(resolve, 2000));

        if (Math.random() > 0.05) {
          this.activateSubscription(productId);
          return true;
        }
        return false;
      }
    } catch (err) {
      console.error("❌ Purchase error:", err);
      return false;
    }
  }

  // Your exact restorePurchases function
  // async restorePurchases(): Promise<boolean> {
  //   try {
  //     if (Capacitor.isNativePlatform()) {
  //       const result = await CapacitorInAppPurchase.restorePurchases();
  //       console.log("🔄 Restored purchases:", result);

  //       if (result.purchases && result.purchases.length > 0) {
  //         const latestPurchase = result.purchases[0];
  //         this.activateSubscription(latestPurchase.productId);
  //         return true;
  //       }
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error("Restore purchases failed:", error);
  //     return false;
  //   }
  // }

  async getProducts(): Promise<SubscriptionProduct[]> {
    if (Capacitor.isNativePlatform()) {
      try {
        const { products } = await CapacitorInAppPurchase.getProducts({
          productIds: [SUBSCRIPTION_PRODUCTS.MONTHLY, SUBSCRIPTION_PRODUCTS.YEARLY],
        });

        return products.map((product: any) => ({
          productId: product.productId,
          price: product.price,
          localizedPrice: product.localizedPrice || `$${product.price}`,
          title: product.title || product.productId,
          description: product.description || '',
          period: product.productId.includes('yearly') ? 'yearly' : 'monthly'
        }));
      } catch (error) {
        console.error('Failed to get native products:', error);
        return this.getMockProducts();
      }
    } else {
      return this.getMockProducts();
    }
  }

  private getMockProducts(): SubscriptionProduct[] {
    return [
      {
        productId: SUBSCRIPTION_PRODUCTS.MONTHLY,
        price: '1.99',
        localizedPrice: '$1.99',
        title: 'BiteMatch Premium Monthly',
        description: 'Unlimited AI recommendations and premium features',
        period: 'monthly'
      },
      {
        productId: SUBSCRIPTION_PRODUCTS.YEARLY,
        price: '19.99',
        localizedPrice: '$19.99',
        title: 'BiteMatch Premium Yearly',
        description: 'Unlimited AI recommendations and premium features - Save 58%!',
        period: 'yearly'
      }
    ];
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    const stored = localStorage.getItem('biteMatchSubscription');
    if (stored) {
      try {
        const status = JSON.parse(stored);

        // Check if subscription has expired
        if (status.expirationDate && new Date() > new Date(status.expirationDate)) {
          status.isActive = false;
          status.productId = null;
          localStorage.setItem('biteMatchSubscription', JSON.stringify(status));
        }

        return status;
      } catch (error) {
        console.error('Error parsing subscription status:', error);
      }
    }

    return this.getDefaultStatus();
  }

  private activateSubscription(productId: string): void {
    const now = new Date();
    const expirationDate = new Date();

    if (productId === SUBSCRIPTION_PRODUCTS.MONTHLY) {
      expirationDate.setMonth(expirationDate.getMonth() + 1);
    } else {
      expirationDate.setFullYear(expirationDate.getFullYear() + 1);
    }

    const status: SubscriptionStatus = {
      isActive: true,
      productId,
      expirationDate: expirationDate.toISOString(),
      isInTrial: false,
      trialEndDate: null
    };

    localStorage.setItem('biteMatchSubscription', JSON.stringify(status));
  }

  private getDefaultStatus(): SubscriptionStatus {
    return {
      isActive: false,
      productId: null,
      expirationDate: null,
      isInTrial: false,
      trialEndDate: null
    };
  }
}

export const subscriptionService = new SubscriptionService();