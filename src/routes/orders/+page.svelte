<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from '../$types';

	let activeTab = $state('ativos'); // 'ativos' | 'historico'

	let { data }: { data: PageData } = $props();

	let orders = data.orders.map((order) => {
		return {
			id: order.id.substring(0, 7),
			date: new Date(order.createdAt).toLocaleDateString('pt-BR', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			}),
			status: 'shipping',
			statusLabel: 'Em transporte',
			statusIcon: 'local_shipping',
			total: order.orderTotal,
			canceled: false,
			items: order.items.map((product) => {
				return {
					name: product.productName,
					image:
						'https://lh3.googleusercontent.com/aida-public/AB6AXuDyyp8XOIsmVJ12xbRGR1Naf3JFDoYCjW8Rg7G4-mrBRGfdEU3J6Vju3dLpxhWlPVpw-Fw8hvk4bBu1fMT_SVP7ck_KOWvfJ6MD31fMkhWYQnowaWYPOOYrOgCawyEuEIiTFSVhXQdL892zHC78vGi5AwxUISx9FjRLIoiw3GgRvJSZQKwqq33poTfyL84UXP95lHbGOX0_cG7hMG6xIs5GEACUO0wzqvuXAFgZaGqvTrapMfh97vrRk8uVMUiDmwz7ONO4B6a-MuM'
				};
			}),
			extraItems: order.items.length - 2
		};
	});

	const activeOrders = orders.filter((o) => o.status === 'shipping');
	const historyOrders = orders.filter((o) => o.status !== 'shipping');

	let visibleOrders = activeTab === 'ativos' ? activeOrders : historyOrders;

	function formatPrice(value) {
		return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}
</script>

<svelte:head>
	<title>Meus Pedidos - Farmacias Economica</title>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- Header -->
<header>
	<button class="icon-btn" aria-label="Menu">
		<span class="material-symbols-outlined">menu</span>
	</button>
	<span class="logo">Farmacias Economica</span>
	<button class="icon-btn" aria-label="Carrinho">
		<span class="material-symbols-outlined">shopping_cart</span>
	</button>
</header>

<!-- Main -->
<main>
	<!-- Page title -->
	<div class="page-header">
		<button
			class="icon-btn back-btn"
			aria-label="Voltar"
			onclick={function () {
				goto('/cart');
			}}
		>
			<span class="material-symbols-outlined">arrow_back</span>
		</button>
		<h1>Meus Pedidos</h1>
	</div>

	<!-- Tabs -->
	<div class="tabs" role="tablist">
		<button
			role="tab"
			aria-selected={activeTab === 'ativos'}
			class="tab"
			class:active={activeTab === 'ativos'}
			onclick={() => (activeTab = 'ativos')}
		>
			Ativos
			{#if activeOrders.length > 0}
				<span class="tab-badge">{activeOrders.length}</span>
			{/if}
		</button>
		<button
			role="tab"
			aria-selected={activeTab === 'historico'}
			class="tab"
			class:active={activeTab === 'historico'}
			onclick={() => (activeTab = 'historico')}
		>
			Histórico
		</button>
	</div>

	<!-- Orders list -->
	<div class="orders-list">
		{#each visibleOrders as order (order.id)}
			<article
				class="order-card"
				class:dimmed={order.status === 'delivered'}
				class:very-dimmed={order?.canceled}
			>
				<!-- Card header -->
				<div class="card-header">
					<div>
						<h2 class="order-id">Pedido #{order.id}</h2>
						<p class="order-date">Realizado em: {order.date}</p>
					</div>
					<div class="status-badge status-{order.status}">
						<span class="material-symbols-outlined icon-sm">{order.statusIcon}</span>
						{order.statusLabel}
					</div>
				</div>

				<!-- Items row -->
				<div class="items-row">
					<div class="thumbnails">
						{#each order.items as item}
							<div class="thumbnail">
								{#if item.image}
									<img src={item.image} alt={item.name} />
								{:else}
									<span class="material-symbols-outlined icon-placeholder">{item.icon}</span>
								{/if}
							</div>
						{/each}
					</div>
					{#if order.extraItems > 0}
						<p class="extra-items">+ {order.extraItems} outro item</p>
					{:else}
						<p class="item-name">{order.items[0]?.name}</p>
					{/if}
				</div>

				<!-- Card footer -->
				<div class="card-footer">
					<div>
						<p class="total-label">Total</p>
						<p class="total-price" class:canceled-price={order?.canceled}>
							{formatPrice(order.total)}
						</p>
					</div>
					<a
						class="details-btn"
						class:outlined={order.status === 'shipping'}
						href={`/orders/${order.id}`}
					>
						Ver Detalhes
					</a>
				</div>
			</article>
		{/each}
	</div>
</main>

<!-- Bottom Nav (mobile) -->
<nav class="bottom-nav" aria-label="Navegação principal">
	<a class="nav-tab" href="/products">
		<span class="material-symbols-outlined">home</span>
		<span>Inicio</span>
	</a>
	<a class="nav-tab" href="/browse">
		<span class="material-symbols-outlined">search</span>
		<span>Busca</span>
	</a>
	<a class="nav-tab" href="/cart">
		<span class="material-symbols-outlined">shopping_cart</span>
		<span>Carrinho</span>
	</a>
	<a class="nav-tab active" href="/account">
		<span class="material-symbols-outlined icon-fill">person</span>
		<span>Conta</span>
	</a>
</nav>

<style>
	/* ─── Tokens ─────────────────────────────────────────────── */
	:global(:root) {
		--primary: #00357f;
		--primary-container: #004aad;
		--on-primary: #ffffff;
		--secondary: #0061a4;
		--secondary-container: #33a0fd;
		--on-secondary-container: #00355c;
		--secondary-fixed: #d1e4ff;
		--on-secondary-fixed: #001d36;
		--error: #ba1a1a;
		--error-container: #ffdad6;
		--on-error-container: #93000a;
		--surface: #f9f9fc;
		--surface-container-low: #f3f3f6;
		--surface-container-high: #e8e8ea;
		--surface-container-lowest: #ffffff;
		--surface-variant: #e2e2e5;
		--on-surface: #1a1c1e;
		--on-surface-variant: #434653;
		--outline: #737784;
		--outline-variant: #c3c6d5;
		--font-display: 'Plus Jakarta Sans', sans-serif;
		--font-body: 'Inter', sans-serif;
	}

	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		background: var(--surface);
		color: var(--on-surface);
		font-family: var(--font-body);
		font-size: 14px;
		line-height: 20px;
		min-height: 100dvh;
		padding-top: 64px;
		padding-bottom: 80px;
		-webkit-font-smoothing: antialiased;
	}

	.material-symbols-outlined {
		font-family: 'Material Symbols Outlined';
		font-variation-settings:
			'FILL' 0,
			'wght' 400,
			'GRAD' 0,
			'opsz' 24;
		font-size: 24px;
		line-height: 1;
		user-select: none;
	}

	.icon-fill {
		font-variation-settings: 'FILL' 1;
	}

	/* ─── Header ─────────────────────────────────────────────── */
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 64px;
		padding: 0 16px;
		background: var(--surface);
		border-bottom: 1px solid var(--outline-variant);
		z-index: 50;
	}

	.logo {
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: 700;
		color: var(--primary);
	}

	.icon-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		border-radius: 50%;
		color: var(--primary);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s;
	}

	.icon-btn:hover {
		background: var(--surface-container-low);
	}

	/* ─── Main ───────────────────────────────────────────────── */
	main {
		max-width: 1024px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
	}

	/* ─── Page Header ────────────────────────────────────────── */
	.page-header {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 24px 16px;
	}

	.back-btn {
		color: var(--on-surface-variant);
		margin-left: -8px;
	}

	h1 {
		font-family: var(--font-display);
		font-size: 24px;
		font-weight: 700;
		line-height: 32px;
		color: var(--on-surface);
	}

	/* ─── Tabs ───────────────────────────────────────────────── */
	.tabs {
		display: flex;
		gap: 32px;
		padding: 0 16px;
		border-bottom: 1px solid var(--outline-variant);
		margin-bottom: 16px;
	}

	.tab {
		position: relative;
		padding-bottom: 12px;
		border: none;
		border-bottom: 2px solid transparent;
		background: none;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--on-surface-variant);
		cursor: pointer;
		transition: color 0.15s;
	}

	.tab:hover {
		color: var(--on-surface);
	}

	.tab.active {
		color: var(--primary);
		border-bottom-color: var(--primary);
	}

	.tab-badge {
		position: absolute;
		top: -4px;
		right: -12px;
		width: 16px;
		height: 16px;
		background: var(--secondary-container);
		color: var(--on-secondary-container);
		border-radius: 50%;
		font-size: 10px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* ─── Orders List ────────────────────────────────────────── */
	.orders-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 0 16px 24px;
	}

	/* ─── Order Card ─────────────────────────────────────────── */
	.order-card {
		background: var(--surface-container-lowest);
		border: 1px solid var(--outline-variant);
		border-radius: 12px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		transition: opacity 0.2s;
	}

	.order-card.dimmed {
		opacity: 0.8;
	}
	.order-card.very-dimmed {
		opacity: 0.6;
	}

	/* Card header */
	.card-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 12px;
	}

	.order-id {
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--on-surface);
		margin-bottom: 4px;
	}

	.order-date {
		font-size: 12px;
		line-height: 16px;
		color: var(--on-surface-variant);
	}

	/* Status badges */
	.status-badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 12px;
		border-radius: 9999px;
		font-size: 12px;
		font-weight: 600;
		white-space: nowrap;
		flex-shrink: 0;
	}

	.status-shipping {
		background: var(--secondary-fixed);
		color: var(--on-secondary-fixed);
	}

	.status-delivered {
		background: var(--surface-container-high);
		color: var(--on-surface-variant);
	}

	.status-canceled {
		background: var(--error-container);
		color: var(--on-error-container);
	}

	.icon-sm {
		font-size: 16px;
	}

	/* Items row */
	.items-row {
		display: flex;
		align-items: center;
		gap: 16px;
		padding: 8px 0;
		border-top: 1px solid var(--surface-variant);
		border-bottom: 1px solid var(--surface-variant);
	}

	.thumbnails {
		display: flex;
		gap: 8px;
	}

	.thumbnail {
		width: 48px;
		height: 48px;
		border-radius: 8px;
		background: var(--surface-container-low);
		border: 1px solid color-mix(in srgb, var(--outline-variant) 30%, transparent);
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.thumbnail img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		mix-blend-mode: multiply;
		display: block;
	}

	.icon-placeholder {
		color: var(--outline);
		font-size: 24px;
	}

	.extra-items,
	.item-name {
		font-size: 14px;
		line-height: 20px;
		color: var(--on-surface);
	}

	/* Card footer */
	.card-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.total-label {
		font-size: 12px;
		line-height: 16px;
		color: var(--on-surface-variant);
	}

	.total-price {
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: 700;
		line-height: 24px;
		color: var(--primary);
	}

	.total-price.canceled-price {
		color: var(--outline);
		text-decoration: line-through;
	}

	.details-btn {
		padding: 8px 16px;
		border-radius: 9999px;
		font-family: var(--font-body);
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s;
		border: none;
		background: none;
		color: var(--primary);
	}

	.details-btn:hover {
		background: var(--surface-container-low);
	}

	.details-btn.outlined {
		border: 1px solid var(--primary);
	}

	.details-btn.outlined:hover {
		background: color-mix(in srgb, var(--primary) 5%, transparent);
	}

	/* ─── Bottom Nav ─────────────────────────────────────────── */
	.bottom-nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 8px 0;
		background: var(--surface);
		border-top: 1px solid var(--outline-variant);
		z-index: 50;
	}

	@media (min-width: 768px) {
		.bottom-nav {
			display: none;
		}
		:global(body) {
			padding-bottom: 0;
		}
	}

	.nav-tab {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2px;
		width: 64px;
		height: 56px;
		border-radius: 12px;
		border: none;
		background: none;
		cursor: pointer;
		color: var(--on-surface-variant);
		font-family: var(--font-body);
		font-size: 10px;
		font-weight: 600;
		transition: background 0.15s;
	}

	.nav-tab:hover {
		background: var(--surface-container-low);
	}

	.nav-tab.active {
		color: var(--primary);
		font-weight: 700;
	}
</style>
