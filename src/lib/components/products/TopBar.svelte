<script lang="ts">
	let { cartCount = 0 }: { cartCount?: number } = $props();
</script>

<header class="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 px-3 py-2 backdrop-blur-md">
	<div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
		<div class="flex items-center gap-3">
			<button class="cursor-pointer text-blue-800" aria-label="Open menu">
				<span class="material-symbols-outlined text-xl">menu</span>
			</button>
			<h1 class="text-lg font-extrabold tracking-tight text-blue-800">Farmacias Economica</h1>
		</div>

		<div class="mx-4 hidden max-w-sm flex-1 md:block">
			<label class="relative flex items-center">
				<span class="material-symbols-outlined absolute left-2.5 text-slate-400 text-lg">search</span>
				<input
					class="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-9 pr-3 text-xs outline-none transition-all focus:ring-1 focus:ring-blue-400/40"
					placeholder="Search medications..."
					type="text"
				/>
			</label>
		</div>

		<div class="flex items-center gap-3">
			<button class="cursor-pointer text-blue-800 md:hidden" aria-label="Open search">
				<span class="material-symbols-outlined text-xl">search</span>
			</button>
			<button class="relative cursor-pointer text-blue-800" aria-label="Open cart">
				<span class="material-symbols-outlined text-xl">shopping_cart</span>
				{#if cartCount > 0}
					<span
						class="absolute -right-1 -top-1 rounded-full bg-red-600 px-1 text-[9px] font-bold text-white"
					>
						{cartCount}
					</span>
				{/if}
			</button>
		</div>
	</div>
</header>
