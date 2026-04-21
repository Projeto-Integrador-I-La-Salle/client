<script lang="ts">
	import type { Product } from '$lib/data/products';
	import ProductCard from '$lib/components/products/ProductCard.svelte';

	let { products = [] }: { products?: Product[] } = $props();
</script>

<section class="grid grid-cols-2 gap-2 px-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</section>
