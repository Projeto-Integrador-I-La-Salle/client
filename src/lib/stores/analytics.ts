import { writable, derived } from 'svelte/store';

export type AnalyticsEvent = {
	type: 'product:viewed' | 'product:added_to_cart' | 'checkout:completed';
	productId: string;
	productName?: string;
	productPrice?: number;
	timestamp: number;
};

export type AnalyticsData = {
	events: AnalyticsEvent[];
};

const STORAGE_KEY = 'farma_analytics';

function createAnalyticsStore() {
	// Initialize from localStorage
	let initialData: AnalyticsData = { events: [] };
	if (typeof window !== 'undefined') {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				initialData = JSON.parse(stored);
			}
		} catch (e) {
			console.error('Failed to load analytics data:', e);
		}
	}

	const { subscribe, update } = writable<AnalyticsData>(initialData);

	// Auto-save to localStorage on changes
	if (typeof window !== 'undefined') {
		subscribe((data) => {
			try {
				localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
			} catch (e) {
				console.error('Failed to save analytics data:', e);
			}
		});
	}

	return {
		subscribe,
		trackEvent(event: Omit<AnalyticsEvent, 'timestamp'>) {
			update((data) => ({
				...data,
				events: [...data.events, { ...event, timestamp: Date.now() }]
			}));
		},
		clearData() {
			update(() => ({ events: [] }));
			if (typeof window !== 'undefined') {
				localStorage.removeItem(STORAGE_KEY);
			}
		}
	};
}

export const analytics = createAnalyticsStore();

// Derived stores for metrics
export const totalViews = derived(analytics, ($analytics) =>
	$analytics.events.filter((e) => e.type === 'product:viewed').length
);

export const totalAddedToCart = derived(analytics, ($analytics) =>
	$analytics.events.filter((e) => e.type === 'product:added_to_cart').length
);

export const totalCheckouts = derived(analytics, ($analytics) =>
	$analytics.events.filter((e) => e.type === 'checkout:completed').length
);

export const conversionRate = derived(
	[totalViews, totalCheckouts],
	([$views, $checkouts]) => ($views > 0 ? (($checkouts / $views) * 100).toFixed(2) : '0.00')
);

export const cartConversionRate = derived(
	[totalViews, totalAddedToCart],
	([$views, $added]) => ($views > 0 ? (($added / $views) * 100).toFixed(2) : '0.00')
);

export const topProducts = derived(analytics, ($analytics) => {
	const productMap = new Map<
		string,
		{
			id: string;
			name: string;
			views: number;
			addedToCart: number;
			checkouts: number;
		}
	>();

	$analytics.events.forEach((event) => {
		if (!productMap.has(event.productId)) {
			productMap.set(event.productId, {
				id: event.productId,
				name: event.productName || 'Unknown',
				views: 0,
				addedToCart: 0,
				checkouts: 0
			});
		}

		const product = productMap.get(event.productId)!;
		if (event.type === 'product:viewed') product.views++;
		if (event.type === 'product:added_to_cart') product.addedToCart++;
		if (event.type === 'checkout:completed') product.checkouts++;
	});

	return Array.from(productMap.values())
		.sort((a, b) => b.views - a.views)
		.slice(0, 10);
});

export const conversionByProduct = derived(topProducts, ($products) =>
	$products.map((p) => ({
		...p,
		conversionRate: p.views > 0 ? ((p.checkouts / p.views) * 100).toFixed(2) : '0.00',
		cartRate: p.views > 0 ? ((p.addedToCart / p.views) * 100).toFixed(2) : '0.00'
	}))
);
