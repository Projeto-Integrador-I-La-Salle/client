<script lang="ts">
	import MetricCard from '$lib/components/analytics/MetricCard.svelte';
	import TopProductsChart from '$lib/components/analytics/TopProductsChart.svelte';
	import ConversionTable from '$lib/components/analytics/ConversionTable.svelte';
	import { totalViews, totalAddedToCart, totalCheckouts, conversionRate, cartConversionRate, conversionByProduct, analytics } from '$lib/stores/analytics';
</script>

<svelte:head>
	<title>Dashboard - Farma+</title>
</svelte:head>

<div class="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-6xl">
		<!-- Header -->
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-bold text-slate-900">Dashboard Analytics</h1>
				<p class="mt-1 text-slate-600">Farma+ - Análise de dados de venda</p>
			</div>
			<button
				onclick={() => {
					if (confirm('Deseja limpar todos os dados de analytics?')) {
						analytics.clearData();
					}
				}}
				class="rounded bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
			>
				Limpar dados
			</button>
		</div>

		<!-- Main Metrics -->
		<div class="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			<MetricCard label="Visualizações" value={$totalViews} />
			<MetricCard label="Adicionados ao Carrinho" value={$totalAddedToCart} change={Number($cartConversionRate)} />
			<MetricCard label="Checkouts Completos" value={$totalCheckouts} />
			<MetricCard label="Taxa de Conversão" value={`${$conversionRate}%`} />
		</div>

		<!-- Charts and Tables -->
		<div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
			<TopProductsChart products={$conversionByProduct} />
			<div class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
				<h2 class="mb-4 text-lg font-bold text-slate-900">Resumo</h2>
				<div class="space-y-3 text-sm">
					<div class="flex justify-between">
						<span class="text-slate-600">Taxa Carrinho:</span>
						<span class="font-semibold text-slate-900">{$cartConversionRate}%</span>
					</div>
					<div class="flex justify-between border-t border-slate-200 pt-3">
						<span class="text-slate-600">Taxa Conversão:</span>
						<span class="font-semibold text-slate-900">{$conversionRate}%</span>
					</div>
					<div class="flex justify-between border-t border-slate-200 pt-3">
						<span class="text-slate-600">Ticket Médio:</span>
						<span class="font-semibold text-slate-900">
							${($conversionByProduct.reduce((sum, p) => sum + (p.checkouts * 10), 0) / (Math.max($totalCheckouts, 1))).toFixed(2)}
						</span>
					</div>
					<div class="flex justify-between border-t border-slate-200 pt-3">
						<span class="text-slate-600">Produtos Únicos:</span>
						<span class="font-semibold text-slate-900">{$conversionByProduct.length}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Full Width Conversion Table -->
		<div class="mt-6">
			<ConversionTable products={$conversionByProduct} />
		</div>

		<!-- Footer -->
		<div class="mt-8 text-center text-xs text-slate-500">
			<p>Dados armazenados localmente • Atualização em tempo real</p>
		</div>
	</div>
</div>
