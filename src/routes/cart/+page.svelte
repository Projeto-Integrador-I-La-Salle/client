<script lang="ts">
	import { productImageUrl, type Product } from '$lib/data/products';

	// ── State ──────────────────────────────────────────────
	let items: Array<Product> = $state(JSON.parse(localStorage.getItem('cart') ?? '[]'));

	let promoCode = $state('');
	const DELIVERY_FEE = 4.99;
	const FREE_DELIVERY_THRESHOLD = 50;

	// ── Derived ────────────────────────────────────────────
	const subtotal = $derived(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
	const itemCount = $derived(items.reduce((sum, i) => sum + i.quantity, 0));
	const isFreeDelivery = $derived(subtotal >= FREE_DELIVERY_THRESHOLD);
	const deliveryFee = $derived(isFreeDelivery ? 0 : DELIVERY_FEE);
	const total = $derived(subtotal + deliveryFee);

	// ── Actions ────────────────────────────────────────────
	function increment(id: string) {
		items = items.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
		localStorage.setItem('cart', JSON.stringify(items));
	}

	function decrement(id: string) {
		items = items
			.map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
			.filter((i) => i.quantity > 0);
		localStorage.setItem('cart', JSON.stringify(items));
	}

	function removeItem(id: string) {
		items = items.filter((i) => i.id !== id);
		localStorage.setItem('cart', JSON.stringify(items));
	}

	function applyPromo() {
		console.log('Aplicando código:', promoCode);
	}

	function checkout() {
		console.log('Finalizando compra...');
	}

	function fmt(value: number) {
		return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
	}
</script>

<svelte:head>
	<title>Farmacias Economica - Carrinho</title>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<!-- TopAppBar -->
<header class="topbar">
	<div class="flex items-center gap-3">
		<button class="icon-btn" aria-label="Abrir menu">
			<span class="material-symbols-outlined icon-primary">menu</span>
		</button>
		<h1 class="brand-title">Farmacias Economica</h1>
	</div>
	<div class="flex items-center gap-1">
		<button class="icon-btn" aria-label="Buscar">
			<span class="material-symbols-outlined icon-primary">search</span>
		</button>
		<button class="icon-btn relative" aria-label="Ver carrinho">
			<span
				class="material-symbols-outlined icon-primary"
				style="font-variation-settings: 'FILL' 1;">shopping_cart</span
			>
			{#if itemCount > 0}
				<span class="cart-badge">{itemCount}</span>
			{/if}
		</button>
	</div>
</header>

<!-- Main -->
<main class="main-canvas">
	<div class="content-layout">
		<!-- Cart Items -->
		<section class="flex flex-col gap-4">
			<h2 class="section-title">Meu Carrinho</h2>

			{#if items.length === 0}
				<div class="empty-state">
					<span class="material-symbols-outlined empty-icon">shopping_cart</span>
					<p>Seu carrinho está vazio.</p>
				</div>
			{:else}
				{#each items as item (item.id)}
					<div class="cart-card">
						<!-- Remove button -->
						<button
							class="remove-btn"
							aria-label="Remover {item.name}"
							onclick={() => removeItem(item.id)}
						>
							<span class="material-symbols-outlined">close</span>
						</button>

						<!-- Product image -->
						<div class="product-thumb">
							<img
								src={productImageUrl(item?.images?.[0])}
								alt={item.name}
								class="h-full w-full object-cover"
							/>
						</div>

						<!-- Info -->
						<div class="item-info">
							<div>
								<span class="item-brand">{item.brand}</span>
								<h3 class="item-name">{item.name}</h3>
							</div>
							<div class="item-footer">
								<span class="item-price">{fmt(item.price * item.quantity)}</span>
								<div class="qty-control">
									<button
										class="qty-btn"
										aria-label="Diminuir quantidade"
										onclick={() => decrement(item.id)}
									>
										<span class="material-symbols-outlined qty-icon">remove</span>
									</button>
									<span class="qty-value">{item.quantity}</span>
									<button
										class="qty-btn"
										aria-label="Aumentar quantidade"
										onclick={() => increment(item.id)}
									>
										<span class="material-symbols-outlined qty-icon">add</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}

				<!-- Delivery notice -->
				<div class="delivery-notice">
					<span class="material-symbols-outlined delivery-icon">local_shipping</span>
					{#if isFreeDelivery}
						<span class="notice-text">Você ganhou entrega grátis! 🎉</span>
					{:else}
						<span class="notice-text">
							Faltam {fmt(FREE_DELIVERY_THRESHOLD - subtotal)} para entrega grátis
						</span>
					{/if}
				</div>
			{/if}
		</section>

		<!-- Order Summary -->
		<aside class="summary-panel">
			<div class="summary-card">
				<h3 class="summary-title">Resumo do Pedido</h3>

				<div class="summary-rows">
					<div class="summary-row">
						<span class="row-label"
							>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'itens'})</span
						>
						<span class="row-value">{fmt(subtotal)}</span>
					</div>
					<div class="summary-row">
						<span class="row-label">Taxa de Entrega</span>
						<span class="row-value">
							{#if isFreeDelivery}
								<span class="free-label">Grátis</span>
							{:else}
								{fmt(deliveryFee)}
							{/if}
						</span>
					</div>
					<div class="summary-row discount-row">
						<span class="row-label">Descontos</span>
						<span class="row-value">-R$ 0,00</span>
					</div>
				</div>

				<div class="total-section">
					<div class="total-row">
						<span class="total-label">Total</span>
						<span class="total-value">{fmt(total)}</span>
					</div>
					<p class="tax-note">Impostos calculados no checkout</p>
				</div>

				<!-- Promo Code -->
				<div class="promo-row">
					<label class="sr-only" for="promo_code">Código Promocional</label>
					<input
						id="promo_code"
						class="promo-input"
						type="text"
						placeholder="Código Promocional"
						bind:value={promoCode}
						onkeydown={(e) => e.key === 'Enter' && applyPromo()}
					/>
					<button class="promo-btn" onclick={applyPromo}>Aplicar</button>
				</div>

				<!-- Checkout -->
				<button class="checkout-btn" onclick={checkout} disabled={items.length === 0}>
					Finalizar Compra
					<span class="material-symbols-outlined checkout-arrow">arrow_forward</span>
				</button>

				<div class="security-note">
					<span class="material-symbols-outlined security-icon">lock</span>
					<span class="security-text">Pagamento 100% Seguro</span>
				</div>
			</div>
		</aside>
	</div>
</main>

<!-- Bottom Nav (mobile only) -->
<nav class="bottom-nav" aria-label="Navegação principal">
	<a href="/" class="nav-item">
		<span class="material-symbols-outlined">home</span>
		<span class="nav-label">Inicio</span>
	</a>
	<a href="/busca" class="nav-item">
		<span class="material-symbols-outlined">search</span>
		<span class="nav-label">Busca</span>
	</a>
	<a href="/carrinho" class="nav-item nav-item--active" aria-current="page">
		<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;"
			>shopping_cart</span
		>
		<span class="nav-label">Carrinho</span>
	</a>
	<a href="/conta" class="nav-item">
		<span class="material-symbols-outlined">person</span>
		<span class="nav-label">Conta</span>
	</a>
</nav>

<style>
	/* ── Reset / Global ───────────────────────────────────── */
	:global(body) {
		background-color: #f9f9fc;
		color: #1a1c1e;
		font-family: 'Inter', sans-serif;
		min-height: max(884px, 100dvh);
		padding-top: 4rem;
		padding-bottom: 5rem;
		-webkit-font-smoothing: antialiased;
	}
	:global(::-webkit-scrollbar) {
		width: 0;
		background: transparent;
	}

	/* ── TopAppBar ────────────────────────────────────────── */
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 0 1rem;
		height: 4rem;
		position: fixed;
		top: 0;
		z-index: 50;
		background-color: #f9f9fc;
		border-bottom: 1px solid #c3c6d5;
	}

	.brand-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 28px;
		font-weight: 700;
		color: #00357f;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
		border-radius: 9999px;
		border: none;
		background: transparent;
		cursor: pointer;
		transition: background-color 0.15s;
	}
	.icon-btn:hover {
		background-color: #f3f3f6;
	}

	.icon-primary {
		color: #00357f;
		font-size: 24px;
	}

	.cart-badge {
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
		background-color: #ba1a1a;
		color: #fff;
		font-size: 10px;
		font-weight: 700;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #f9f9fc;
	}

	/* ── Main Layout ──────────────────────────────────────── */
	.main-canvas {
		max-width: 1280px;
		margin: 0 auto;
		padding: 1rem 1rem;
	}
	@media (min-width: 768px) {
		.main-canvas {
			padding: 1rem 3rem;
		}
	}

	.content-layout {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	@media (min-width: 1024px) {
		.content-layout {
			flex-direction: row;
			gap: 1.5rem;
		}
	}

	/* ── Section Title ────────────────────────────────────── */
	.section-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 24px;
		line-height: 32px;
		font-weight: 700;
		color: #00357f;
		margin-bottom: 0.25rem;
	}

	/* ── Empty State ──────────────────────────────────────── */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: 3rem 1rem;
		color: #737784;
		font-size: 16px;
	}
	.empty-icon {
		font-size: 48px;
		color: #c3c6d5;
	}

	/* ── Cart Card ────────────────────────────────────────── */
	.cart-card {
		background-color: #fff;
		border-radius: 0.75rem;
		border: 1px solid #c3c6d5;
		padding: 1rem;
		display: flex;
		gap: 1rem;
		align-items: center;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.remove-btn {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0.25rem;
		border-radius: 9999px;
		color: #737784;
		display: flex;
		align-items: center;
		justify-content: center;
		transition:
			color 0.15s,
			background-color 0.15s;
		font-size: 18px;
	}
	.remove-btn:hover {
		color: #ba1a1a;
		background-color: #fff0f0;
	}

	.product-thumb {
		width: 6rem;
		height: 6rem;
		background-color: #f3f3f6;
		border-radius: 0.5rem;
		overflow: hidden;
		flex-shrink: 0;
	}

	.item-info {
		display: flex;
		flex-direction: column;
		flex: 1;
		justify-content: space-between;
		height: 100%;
		padding: 0.25rem 0;
		min-height: 5rem;
	}

	.item-brand {
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		color: #737784;
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}

	.item-name {
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;
		color: #1a1c1e;
		margin-top: 0.25rem;
		padding-right: 1.5rem; /* space for close btn */
	}

	.item-footer {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		margin-top: 0.75rem;
	}

	.item-price {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 18px;
		line-height: 24px;
		font-weight: 700;
		color: #00357f;
	}

	/* ── Quantity Control ─────────────────────────────────── */
	.qty-control {
		display: flex;
		align-items: center;
		border: 1px solid #c3c6d5;
		border-radius: 9999px;
		background-color: #f9f9fc;
	}

	.qty-btn {
		width: 2rem;
		height: 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: transparent;
		border: none;
		cursor: pointer;
		color: #00357f;
		border-radius: 9999px;
		transition: background-color 0.15s;
	}
	.qty-btn:hover {
		background-color: #f3f3f6;
	}

	.qty-icon {
		font-size: 16px;
	}

	.qty-value {
		width: 2rem;
		text-align: center;
		font-size: 14px;
		font-weight: 400;
		color: #1a1c1e;
	}

	/* ── Delivery Notice ──────────────────────────────────── */
	.delivery-notice {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-top: 0.25rem;
		color: #0061a4;
	}
	.delivery-icon {
		font-size: 18px;
	}
	.notice-text {
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
	}

	/* ── Summary Panel ────────────────────────────────────── */
	.summary-panel {
		width: 100%;
		flex-shrink: 0;
	}
	@media (min-width: 1024px) {
		.summary-panel {
			width: 24rem;
		}
	}

	.summary-card {
		background-color: #f3f3f6;
		border-radius: 0.75rem;
		padding: 1.5rem;
		position: sticky;
		top: 5.5rem;
	}

	.summary-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 28px;
		font-weight: 600;
		color: #00357f;
		margin-bottom: 1rem;
		border-bottom: 1px solid #c3c6d5;
		padding-bottom: 0.5rem;
	}

	.summary-rows {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.summary-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.row-label {
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		color: #434653;
	}

	.row-value {
		font-size: 14px;
		line-height: 20px;
		font-weight: 400;
		color: #1a1c1e;
	}

	.free-label {
		color: #0061a4;
		font-weight: 600;
	}

	.discount-row .row-label,
	.discount-row .row-value {
		color: #0061a4;
	}

	/* ── Total ────────────────────────────────────────────── */
	.total-section {
		border-top: 1px solid #c3c6d5;
		padding-top: 1rem;
		margin-bottom: 1.5rem;
	}

	.total-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.total-label {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 28px;
		font-weight: 600;
		color: #1a1c1e;
	}

	.total-value {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 32px;
		line-height: 40px;
		letter-spacing: -0.02em;
		font-weight: 700;
		color: #00357f;
	}

	.tax-note {
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		color: #737784;
		margin-top: 0.25rem;
		text-align: right;
	}

	/* ── Promo Code ───────────────────────────────────────── */
	.promo-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}

	.promo-input {
		flex: 1;
		background-color: #f9f9fc;
		border: 1px solid #c3c6d5;
		border-radius: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 14px;
		font-family: 'Inter', sans-serif;
		outline: none;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}
	.promo-input:focus {
		border-color: #00357f;
		box-shadow: 0 0 0 1px #00357f;
	}

	.promo-btn {
		background-color: #f9f9fc;
		border: 1px solid #00357f;
		color: #00357f;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 14px;
		font-family: 'Inter', sans-serif;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.15s;
		white-space: nowrap;
	}
	.promo-btn:hover {
		background-color: #f3f3f6;
	}

	/* ── Checkout Button ──────────────────────────────────── */
	.checkout-btn {
		width: 100%;
		background-color: #00357f;
		color: #fff;
		padding: 0.75rem 1rem;
		border-radius: 9999px;
		border: none;
		cursor: pointer;
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		font-weight: 600;
		letter-spacing: 0.01em;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition:
			background-color 0.15s,
			box-shadow 0.15s;
	}
	.checkout-btn:hover:not(:disabled) {
		background-color: #004aad;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
	.checkout-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.checkout-arrow {
		font-size: 16px;
	}

	/* ── Security Note ────────────────────────────────────── */
	.security-note {
		margin-top: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}
	.security-icon {
		color: #737784;
		font-size: 18px;
	}
	.security-text {
		font-size: 12px;
		font-weight: 600;
		color: #737784;
	}

	/* ── Bottom Nav ───────────────────────────────────────── */
	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 50;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 0.5rem 0;
		background-color: #f9f9fc;
		border-top: 1px solid #c3c6d5;
		box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.05);
	}
	@media (min-width: 768px) {
		.bottom-nav {
			display: none;
		}
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 4rem;
		height: 3.5rem;
		border-radius: 0.5rem;
		text-decoration: none;
		color: #434653;
		transition: background-color 0.15s;
		font-size: 12px;
	}
	.nav-item:hover {
		background-color: #f3f3f6;
	}
	.nav-item--active {
		color: #00357f;
		font-weight: 700;
	}

	.nav-label {
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		margin-top: 0.25rem;
	}
</style>
