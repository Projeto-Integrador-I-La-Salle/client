import { env } from '$env/dynamic/public';

export type Category = {
	name: string;
	icon: string;
	active?: boolean;
};

export type Filter = {
	label: string;
	active?: boolean;
};

/** Base URL for product images (API serves files under /images/). */
export const PRODUCT_IMAGE_BASE = env.PUBLIC_PRODUCT_IMAGE_BASE_URL || 'http://192.168.0.104:3000/images/';

/** Shown when the product has no image (served from `static/`). */
export const DEFAULT_PRODUCT_IMAGE = '/product-placeholder.svg';

/** Resolves `image` to a full URL; keeps absolute http(s) URLs unchanged. */
export function productImageUrl(image: string | undefined | null): string {
	if (image == null || image.trim() === '') return DEFAULT_PRODUCT_IMAGE;
	if (/^https?:\/\//i.test(image)) return image;
	const path = image
		.replace(/^\//, '')
		.replace(/^uploads\/?/i, '');
	return new URL(path, PRODUCT_IMAGE_BASE).href;
}

export type Product = {
	id: string;
	brand: string;
	name: string;
	images?: string[] | null;
	price: number;
	quantity: number;
	originalPrice?: number;
	sale?: boolean;
	rxRequired?: boolean;
};

export const categories: Category[] = [
	{ name: 'Vitaminas', icon: 'pill', active: true },
	{ name: 'Alivio dor', icon: 'healing' },
	{ name: 'Bebe', icon: 'child_care' },
	{ name: 'Pele', icon: 'face' },
	{ name: 'Alergia', icon: 'respiratory_rate' },
	{ name: 'Fitness', icon: 'fitness_center' }
];

export const filters: Filter[] = [
	{ label: 'Todos', active: true },
	{ label: 'Em estoque' },
	{ label: 'Prescrição' },
	{ label: 'Venda' }
];

