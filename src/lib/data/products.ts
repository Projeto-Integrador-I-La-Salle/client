export type Category = {
	name: string;
	icon: string;
};

export type Filter = {
	label: string;
	active?: boolean;
};

/** Base URL for product images (API serves files under /images/). */
export const PRODUCT_IMAGE_BASE = 'http://localhost:3000/images/';

/** Resolves `image` to a full URL; keeps absolute http(s) URLs unchanged. */
export function productImageUrl(image: string): string {
	if (/^https?:\/\//i.test(image)) return image;
	const path = image
		.replace(/^\//, '')
		.replace(/^uploads\/?/i, '');
	return new URL(path, PRODUCT_IMAGE_BASE).href;
}

export type Product = {
	brand: string;
	name: string;
	images: string[];
	price: number;
	originalPrice?: number;
	sale?: boolean;
	rxRequired?: boolean;
};

export const categories: Category[] = [
	{ name: 'Vitamins', icon: 'pill' },
	{ name: 'Pain Relief', icon: 'healing' },
	{ name: 'First Aid', icon: 'medical_services' },
	{ name: 'Baby', icon: 'child_care' },
	{ name: 'Skin', icon: 'face' },
	{ name: 'Allergy', icon: 'respiratory_rate' },
	{ name: 'Fitness', icon: 'fitness_center' }
];

export const filters: Filter[] = [
	{ label: 'All', active: true },
	{ label: 'In Stock' },
	{ label: 'Rx Required' },
	{ label: 'Sale' }
];

export const products: Product[] = [
	{
		brand: 'NATURES BOUNTY',
		name: 'Vitamin D3 Immune Support 50mcg',
		images: ['natures-bounty-vitamin-d3.webp'],
		price: 14.5,
		originalPrice: 18.99,
		sale: true
	},
	{
		brand: 'VENTOLIN',
		name: 'Albuterol Sulfate Inhaler 90mcg',
		images: ['ventolin-inhaler.webp'],
		price: 32,
		rxRequired: true
	},
	{
		brand: 'BAYER',
		name: 'Extra Strength Aspirin (100ct Tablets)',
		images: ['bayer-aspirin-100ct.webp'],
		price: 12.99
	},
	{
		brand: 'PURE ENCAPSULATIONS',
		name: 'Magnesium Glycinate Complex 120ct',
		images: ['pure-encapsulations-magnesium-120ct.webp'],
		price: 28.4
	},
	{
		brand: 'CERAVE',
		name: 'Daily Moisturizing Lotion 12oz',
		images: ['cerave-daily-moisturizing-lotion-12oz.webp'],
		price: 16.25
	},
	{
		brand: 'BAND-AID',
		name: 'Tough Strips Waterproof (20ct)',
		images: ['band-aid-tough-strips-20ct.webp'],
		price: 8.99
	}
];
