<script lang="ts">
	import BottomNav from '$lib/components/products/BottomNav.svelte';
	import CategoryScroller from '$lib/components/products/CategoryScroller.svelte';
	import FilterChips from '$lib/components/products/FilterChips.svelte';
	import ProductGrid from '$lib/components/products/ProductGrid.svelte';
	import PromoCarousel from '$lib/components/products/PromoCarousel.svelte';
	import TopBar from '$lib/components/products/TopBar.svelte';
	import { categories, filters, products } from '$lib/data/products';
</script>

<svelte:head>
	<title>Apothecary - Modern Clinical Pharmacy</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
	/>
</svelte:head>

<div class="min-h-dvh bg-slate-50 text-xs text-slate-900 antialiased">
	<TopBar cartCount={2} />

	<main class="mx-auto max-w-7xl space-y-4 px-2 pb-16 pt-14">
		<PromoCarousel />
		<CategoryScroller {categories} />
		<FilterChips {filters} />
		<ProductGrid {products} />
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