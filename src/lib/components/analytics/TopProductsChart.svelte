<script lang="ts">
	import type { conversionByProduct } from '$lib/stores/analytics';

	let { products }: { products: Awaited<ReturnType<typeof conversionByProduct>> } = $props();
</script>

<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
	<h2 class="mb-4 text-lg font-bold text-slate-900">Top Produtos (por visualizações)</h2>

	{#if products.length === 0}
		<p class="text-center text-slate-500">Sem dados disponíveis</p>
	{:else}
		<div class="space-y-3">
			{#each products as product}
				<div class="flex items-end gap-3">
					<div class="flex-1">
						<p class="truncate text-sm font-medium text-slate-900">{product.name}</p>
						<p class="text-xs text-slate-500">{product.views} visualizações</p>
					</div>
					<div class="h-6 rounded bg-blue-500" style={`width: ${(product.views / products[0].views) * 100}%`}></div>
				</div>
			{/each}
		</div>
	{/if}
</div>
