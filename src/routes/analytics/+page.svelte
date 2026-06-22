<script lang="ts">
	import {
		analytics,
		totalViews,
		totalAddedToCart,
		totalCheckouts,
		conversionRate,
		cartConversionRate,
		topProducts
	} from '$lib/stores/analytics';
	import BottomNav from '$lib/components/products/BottomNav.svelte';

	// ── Time-series: eventos agrupados por hora (últimas 12h) ──────────────
	const now = Date.now();
	const WINDOW_MS = 12 * 60 * 60 * 1000;

	const hourlyData = $derived.by(() => {
		const buckets: Record<number, { views: number; cart: number; checkout: number }> = {};

		for (let i = 11; i >= 0; i--) {
			const h = new Date(now - i * 60 * 60 * 1000).getHours();
			buckets[h] = { views: 0, cart: 0, checkout: 0 };
		}

		$analytics.events
			.filter((e) => now - e.timestamp <= WINDOW_MS)
			.forEach((e) => {
				const h = new Date(e.timestamp).getHours();
				if (buckets[h]) {
					if (e.type === 'product:viewed') buckets[h].views++;
					if (e.type === 'product:added_to_cart') buckets[h].cart++;
					if (e.type === 'checkout:completed') buckets[h].checkout++;
				}
			});

		return Object.entries(buckets).map(([h, v]) => ({ hour: Number(h), ...v }));
	});

	const chartMax = $derived(
		Math.max(1, ...hourlyData.map((d) => Math.max(d.views, d.cart, d.checkout)))
	);

	// ── Funil ──────────────────────────────────────────────────────────────
	const funnelSteps = $derived([
		{ label: 'Visualizações', value: $totalViews, color: '#005eb8', icon: 'visibility' },
		{ label: 'Adicionados', value: $totalAddedToCart, color: '#0284c7', icon: 'add_shopping_cart' },
		{ label: 'Finalizados', value: $totalCheckouts, color: '#0ea5e9', icon: 'check_circle' }
	]);

	const funnelMax = $derived(Math.max(1, $totalViews));

	function pct(v: number) {
		return funnelMax > 0 ? ((v / funnelMax) * 100).toFixed(0) : '0';
	}

	// ── Helpers ────────────────────────────────────────────────────────────
	function fmt(h: number) {
		return h.toString().padStart(2, '0') + 'h';
	}

	function barH(v: number, max: number) {
		return max > 0 ? Math.round((v / max) * 52) : 0;
	}
</script>

<svelte:head>
	<title>Analytics · Farmacias Economica</title>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
	/>
</svelte:head>

<div class="analytics-shell min-h-dvh bg-slate-50 text-slate-900 antialiased">
	<!-- ── Header ── -->
	<header class="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md">
		<div class="mx-auto flex max-w-2xl items-center justify-between">
			<div class="flex items-center gap-2">
				<span class="material-symbols-outlined text-xl text-blue-800">monitoring</span>
				<h1 class="text-sm font-extrabold tracking-tight text-blue-800">Analytics</h1>
			</div>
			<button
				onclick={() => analytics.clearData()}
				class="flex items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-[10px] font-medium text-slate-500 transition-colors hover:border-red-200 hover:text-red-500"
				aria-label="Limpar dados de analytics"
			>
				<span class="material-symbols-outlined text-sm">restart_alt</span>
				Resetar dados
			</button>
		</div>
	</header>

	<main class="mx-auto max-w-2xl space-y-4 px-3 pt-16 pb-20">

		<!-- ── KPI Cards ── -->
		<section aria-label="Indicadores principais">
			<div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
				<!-- Visualizações -->
				<div class="kpi-card rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
					<div class="mb-2 flex items-center justify-between">
						<span class="material-symbols-outlined text-base text-blue-700"
							style="font-variation-settings: 'FILL' 1;">visibility</span>
						<span class="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Visualizações</span>
					</div>
					<p class="kpi-value text-2xl font-extrabold text-slate-900">{$totalViews}</p>
					<p class="mt-0.5 text-[10px] text-slate-400">produtos vistos</p>
				</div>

				<!-- Carrinho -->
				<div class="kpi-card rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
					<div class="mb-2 flex items-center justify-between">
						<span class="material-symbols-outlined text-base text-sky-600"
							style="font-variation-settings: 'FILL' 1;">add_shopping_cart</span>
						<span class="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Carrinho</span>
					</div>
					<p class="kpi-value text-2xl font-extrabold text-slate-900">{$totalAddedToCart}</p>
					<p class="mt-0.5 text-[10px] text-slate-400">adições ao carrinho</p>
				</div>

				<!-- Pedidos -->
				<div class="kpi-card rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
					<div class="mb-2 flex items-center justify-between">
						<span class="material-symbols-outlined text-base text-emerald-600"
							style="font-variation-settings: 'FILL' 1;">check_circle</span>
						<span class="text-[9px] font-semibold uppercase tracking-wider text-slate-400">Pedidos</span>
					</div>
					<p class="kpi-value text-2xl font-extrabold text-slate-900">{$totalCheckouts}</p>
					<p class="mt-0.5 text-[10px] text-slate-400">pedidos finalizados</p>
				</div>

				<!-- Conversão -->
				<div class="kpi-card rounded-xl border border-blue-100 bg-blue-50 p-3 shadow-sm">
					<div class="mb-2 flex items-center justify-between">
						<span class="material-symbols-outlined text-base text-blue-700"
							style="font-variation-settings: 'FILL' 1;">trending_up</span>
						<span class="text-[9px] font-semibold uppercase tracking-wider text-blue-400">Conversão</span>
					</div>
					<p class="kpi-value text-2xl font-extrabold text-blue-800">{$conversionRate}%</p>
					<p class="mt-0.5 text-[10px] text-blue-500">vista → pedido</p>
				</div>
			</div>
		</section>

		<!-- ── Funil de Conversão ── -->
		<section aria-label="Funil de conversão" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<h2 class="mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">Funil de conversão</h2>

			<div class="space-y-3">
				{#each funnelSteps as step, i}
					{@const width = funnelMax > 0 ? Math.max(8, (step.value / funnelMax) * 100) : 8}
					{@const dropPct = i > 0 ? (funnelSteps[i - 1].value > 0 ? (((funnelSteps[i - 1].value - step.value) / funnelSteps[i - 1].value) * 100).toFixed(0) : '—') : null}

					<div>
						{#if dropPct !== null}
							<div class="mb-1 flex items-center gap-1 pl-1">
								<span class="material-symbols-outlined text-xs text-slate-300">arrow_downward</span>
								<span class="text-[9px] text-slate-400">
									{dropPct === '—' ? '—' : `-${dropPct}%`} de queda
								</span>
							</div>
						{/if}

						<div class="flex items-center gap-3">
							<div class="funnel-bar-track relative h-8 flex-1 overflow-hidden rounded-md bg-slate-100">
								<div
									class="funnel-bar absolute inset-y-0 left-0 flex items-center rounded-md pl-2 transition-all duration-500"
									style="width: {width}%; background: {step.color};"
								>
									<span class="material-symbols-outlined text-sm text-white/80"
										style="font-variation-settings: 'FILL' 1;">{step.icon}</span>
								</div>
							</div>
							<div class="w-20 shrink-0 text-right">
								<span class="text-sm font-bold text-slate-800">{step.value}</span>
								<span class="ml-1 text-[10px] text-slate-400">({pct(step.value)}%)</span>
							</div>
						</div>
						<p class="mt-0.5 pl-0.5 text-[10px] font-medium text-slate-500">{step.label}</p>
					</div>
				{/each}
			</div>

			<div class="mt-4 flex gap-3 border-t border-slate-100 pt-3">
				<div class="text-center">
					<p class="text-xs font-bold text-slate-800">{$cartConversionRate}%</p>
					<p class="text-[9px] text-slate-400">Vista → Carrinho</p>
				</div>
				<div class="w-px bg-slate-100"></div>
				<div class="text-center">
					<p class="text-xs font-bold text-slate-800">{$conversionRate}%</p>
					<p class="text-[9px] text-slate-400">Vista → Pedido</p>
				</div>
				<div class="w-px bg-slate-100"></div>
				<div class="text-center">
					<p class="text-xs font-bold text-slate-800">
						{$totalAddedToCart > 0
							? (($totalCheckouts / $totalAddedToCart) * 100).toFixed(0)
							: '0'}%
					</p>
					<p class="text-[9px] text-slate-400">Carrinho → Pedido</p>
				</div>
			</div>
		</section>

		<!-- ── Gráfico de barras (últimas 12h) ── -->
		<section aria-label="Atividade nas últimas 12 horas" class="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
			<h2 class="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
				Atividade — últimas 12h
			</h2>
			<div class="mb-3 flex items-center gap-3">
				<span class="flex items-center gap-1 text-[10px] text-slate-500">
					<span class="inline-block h-2 w-2 rounded-sm bg-blue-700"></span> Visualizações
				</span>
				<span class="flex items-center gap-1 text-[10px] text-slate-500">
					<span class="inline-block h-2 w-2 rounded-sm bg-sky-400"></span> Carrinho
				</span>
				<span class="flex items-center gap-1 text-[10px] text-slate-500">
					<span class="inline-block h-2 w-2 rounded-sm bg-emerald-400"></span> Pedidos
				</span>
			</div>

			<div class="flex items-end gap-1 overflow-x-auto pb-1" style="height: 72px;">
				{#each hourlyData as bucket}
					<div class="flex shrink-0 flex-col items-center gap-0.5" style="min-width: 20px;">
						<div class="flex items-end gap-0.5" style="height: 52px;">
							<div
								class="w-1.5 rounded-t bg-blue-700 transition-all duration-300"
								style="height: {barH(bucket.views, chartMax)}px;"
								title="Visualizações: {bucket.views}"
							></div>
							<div
								class="w-1.5 rounded-t bg-sky-400 transition-all duration-300"
								style="height: {barH(bucket.cart, chartMax)}px;"
								title="Carrinho: {bucket.cart}"
							></div>
							<div
								class="w-1.5 rounded-t bg-emerald-400 transition-all duration-300"
								style="height: {barH(bucket.checkout, chartMax)}px;"
								title="Pedidos: {bucket.checkout}"
							></div>
						</div>
						<span class="text-[8px] text-slate-400">{fmt(bucket.hour)}</span>
					</div>
				{/each}
			</div>

			{#if $analytics.events.length === 0}
				<p class="mt-2 text-center text-[11px] text-slate-400">
					Nenhuma interação registrada ainda.<br />
					<a href="/products" class="text-blue-600 underline-offset-2 hover:underline">
						Navegue pelo catálogo
					</a> para gerar dados.
				</p>
			{/if}
		</section>

		<!-- ── Top Produtos ── -->
		<section aria-label="Produtos mais vistos" class="rounded-xl border border-slate-200 bg-white shadow-sm">
			<div class="border-b border-slate-100 px-4 py-3">
				<h2 class="text-xs font-bold uppercase tracking-wider text-slate-400">Top produtos</h2>
			</div>

			{#if $topProducts.length === 0}
				<p class="px-4 py-6 text-center text-[11px] text-slate-400">
					Ainda sem dados de produto. Visite o catálogo para começar.
				</p>
			{:else}
				<ul class="divide-y divide-slate-100">
					{#each $topProducts.slice(0, 8) as product, i}
						{@const maxViews = $topProducts[0].views || 1}
						<li class="flex items-center gap-3 px-4 py-2.5">
							<span class="w-4 shrink-0 text-center text-[10px] font-bold text-slate-300">
								{i + 1}
							</span>
							<div class="min-w-0 flex-1">
								<p class="truncate text-[11px] font-semibold text-slate-800">{product.name}</p>
								<div class="mt-1 h-1 w-full overflow-hidden rounded-full bg-slate-100">
									<div
										class="h-full rounded-full bg-blue-600 transition-all duration-500"
										style="width: {(product.views / maxViews) * 100}%"
									></div>
								</div>
							</div>
							<div class="shrink-0 text-right">
								<span class="text-xs font-bold text-slate-700">{product.views}</span>
								<span class="ml-0.5 text-[9px] text-slate-400">views</span>
							</div>
							<div class="shrink-0 text-right">
								<span class="text-[10px] font-medium text-emerald-600">{product.addedToCart}</span>
								<span class="material-symbols-outlined align-middle text-[10px] text-emerald-400"
									style="font-variation-settings: 'FILL' 1;">shopping_cart</span>
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</section>

		<!-- ── Jornada — eventos recentes ── -->
		<section aria-label="Eventos recentes" class="rounded-xl border border-slate-200 bg-white shadow-sm">
			<div class="border-b border-slate-100 px-4 py-3">
				<h2 class="text-xs font-bold uppercase tracking-wider text-slate-400">
					Jornada do cliente — eventos recentes
				</h2>
			</div>

			{#if $analytics.events.length === 0}
				<p class="px-4 py-6 text-center text-[11px] text-slate-400">Nenhum evento registrado.</p>
			{:else}
				<ul class="divide-y divide-slate-100">
					{#each [...$analytics.events].reverse().slice(0, 12) as event}
						{@const isView = event.type === 'product:viewed'}
						{@const isCart = event.type === 'product:added_to_cart'}
						{@const isCheckout = event.type === 'checkout:completed'}
						<li class="flex items-center gap-3 px-4 py-2">
							<span
								class="material-symbols-outlined text-base shrink-0"
								style="font-variation-settings: 'FILL' 1; color: {isView ? '#005eb8' : isCart ? '#0284c7' : '#059669'};"
							>
								{isView ? 'visibility' : isCart ? 'add_shopping_cart' : 'check_circle'}
							</span>
							<div class="min-w-0 flex-1">
								<p class="truncate text-[11px] text-slate-700">
									{#if isView}Visualizou{:else if isCart}Adicionou ao carrinho{:else}Finalizou pedido{/if}
									<span class="font-semibold">{event.productName ?? event.productId}</span>
								</p>
							</div>
							<time class="shrink-0 text-[9px] tabular-nums text-slate-400">
								{new Date(event.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
							</time>
						</li>
					{/each}
				</ul>
				{#if $analytics.events.length > 12}
					<p class="px-4 py-2 text-center text-[10px] text-slate-400">
						Mostrando 12 de {$analytics.events.length} eventos
					</p>
				{/if}
			{/if}
		</section>

	</main>

	<BottomNav />
</div>

<style>
	:global(.material-symbols-outlined) {
		font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20;
	}

	.analytics-shell {
		font-family: 'Manrope', 'Inter', sans-serif;
	}

	.kpi-card {
		transition: box-shadow 0.15s ease;
	}

	.kpi-card:hover {
		box-shadow: 0 4px 12px rgba(0, 94, 184, 0.08);
	}

	.kpi-value {
		font-feature-settings: 'tnum';
		font-variant-numeric: tabular-nums;
	}

	.funnel-bar {
		transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>