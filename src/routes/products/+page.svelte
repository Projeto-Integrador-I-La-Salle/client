<script lang="ts">
	import ProductsPageShell from '$lib/components/products/ProductsPageShell.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<ProductsPageShell products={data.products.content} productsError={data.productsError} />