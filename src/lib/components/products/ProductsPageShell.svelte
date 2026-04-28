<script lang="ts">
	import BottomNav from '$lib/components/products/BottomNav.svelte';
	import CategoryScroller from '$lib/components/products/CategoryScroller.svelte';
	import FilterChips from '$lib/components/products/FilterChips.svelte';
	import ProductGrid from '$lib/components/products/ProductGrid.svelte';
	import PromoCarousel from '$lib/components/products/PromoCarousel.svelte';
	import TopBar from '$lib/components/products/TopBar.svelte';
	import { categories, filters, type Product } from '$lib/data/products';

	let {
		products,
		productsError = '',
		enableSearch = false
	}: {
		products: Product[];
		productsError?: string;
		enableSearch?: boolean;
	} = $props();

	let searchTerm = $state('');

	const normalize = (value: string) =>
		value
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim();

	const filteredProducts = $derived.by(() => {
		const term = normalize(searchTerm);
		if (!term) return products;

		return products.filter((product: Product) => {
			const brand = normalize(product.brand);
			const name = normalize(product.name);
			return brand.includes(term) || name.includes(term);
		});
	});
</script>

<svelte:head>
	<title>Farmacias Economica</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
	/>
</svelte:head>

<div class="min-h-dvh bg-slate-50 text-xs text-slate-900 antialiased">
	<TopBar cartCount={2} />

	<main class="mx-auto max-w-7xl space-y-4 px-2 pb-16 pt-14">
		{#if enableSearch}
			<section class="rounded-md border border-slate-200 bg-white p-2 shadow-sm">
				<label class="relative flex items-center" for="browse-search">
					<span class="sr-only">Buscar por marca ou nome do produto</span>
					<span class="material-symbols-outlined absolute left-2.5 text-lg text-slate-400">search</span>
					<input
						id="browse-search"
						class="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none transition-all focus:ring-1 focus:ring-blue-400/40"
						bind:value={searchTerm}
						placeholder="Buscar por marca ou nome do produto"
						type="text"
					/>
				</label>
			</section>
		{/if}

		<PromoCarousel />
		<CategoryScroller {categories} />
		<FilterChips {filters} />

		{#if productsError}
			<p class="px-1 text-sm text-red-600">{productsError}</p>
		{:else if filteredProducts.length === 0}
			<p class="px-1 text-sm text-slate-500">Nenhum produto encontrado para essa busca.</p>
		{/if}

		{#if enableSearch}
			<p class="sr-only" aria-live="polite">{filteredProducts.length} resultados encontrados.</p>
		{/if}

		<ProductGrid products={filteredProducts} />
	</main>

	<BottomNav />
</div>

<style>
	:global(.material-symbols-outlined) {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
	}

	:global(.no-scrollbar::-webkit-scrollbar) {
		display: none;
	}

	:global(.no-scrollbar) {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}

	:global(.apothecary-gradient) {
		background: linear-gradient(135deg, #005eb8 0%, #00478d 100%);
	}
</style>
