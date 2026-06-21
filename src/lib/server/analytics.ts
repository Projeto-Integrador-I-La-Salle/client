import { analytics, type AnalyticsEvent } from '$lib/stores/analytics';

/**
 * Track a product view event
 */
export function trackProductView(productId: string, productName?: string) {
	analytics.trackEvent({
		type: 'product:viewed',
		productId,
		productName
	});
}

/**
 * Track when a product is added to cart
 */
export function trackProductAddedToCart(
	productId: string,
	productName?: string,
	productPrice?: number
) {
	analytics.trackEvent({
		type: 'product:added_to_cart',
		productId,
		productName,
		productPrice
	});
}

/**
 * Track checkout completion
 */
export function trackCheckoutCompleted(productId: string, productName?: string) {
	analytics.trackEvent({
		type: 'checkout:completed',
		productId,
		productName
	});
}
