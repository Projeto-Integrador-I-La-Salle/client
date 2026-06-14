<script lang="ts">
	import { productImageUrl, type Product } from '$lib/data/products';

	let { product }: { product: Product } = $props();
</script>

<a
	class="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-slate-200 bg-white transition-all hover:shadow-md"
	href={`/products/${product.id}`}
>
	<div class="relative aspect-square bg-slate-100 p-2">
		<img
			alt={product.name}
			class="h-full w-full object-contain mix-blend-multiply transition-transform group-hover:scale-105"
			decoding="async"
			loading="lazy"
			src={productImageUrl(product.images?.[0])}
		/>
		{#if product.sale}
			<span
				class="absolute top-1 left-1 rounded bg-blue-700 px-1 text-[8px] font-bold text-white uppercase"
			>
				SALE
			</span>
		{/if}
		{#if product.rxRequired}
			<span
				class="absolute top-1 right-1 flex items-center gap-0.5 rounded bg-red-100 px-1 text-[8px] font-bold text-red-700 uppercase"
			>
				<span
					class="material-symbols-outlined text-[10px]"
					style="font-variation-settings: 'FILL' 1;">description</span
				>
				Rx
			</span>
		{/if}
	</div>

	<div class="flex flex-1 flex-col justify-between space-y-1 p-2">
		<div>
			<p class="text-[8px] font-bold tracking-tighter text-slate-500 uppercase">{product.brand}</p>
			<h4 class="line-clamp-2 text-[11px] leading-tight font-medium text-slate-900">
				{product.name}
			</h4>
		</div>

		<div class="mt-auto flex items-center justify-between pt-1">
			<div class="flex flex-col">
				{#if product.originalPrice}
					<span class="text-[9px] text-slate-500 line-through"
						>${product.originalPrice.toFixed(2)}</span
					>
				{/if}
				<span class="text-sm font-bold text-blue-700">${product.price.toFixed(2)}</span>
			</div>
			<button
				class="flex h-7 w-7 items-center justify-center rounded bg-slate-200 text-blue-700 transition-colors hover:bg-blue-700 hover:text-white"
				aria-label={`Add ${product.name} to cart`}
			>
				<span class="material-symbols-outlined text-lg">add_shopping_cart</span>
			</button>
		</div>
	</div>
</a>
