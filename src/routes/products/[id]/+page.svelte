<script lang="ts">
	import type { PageData } from './$types';
	import { productImageUrl, type Product } from '$lib/data/products';
	import AddedToCartModal from '$lib/components/products/AddedToCartModal.svelte';
	import { redirect } from '@sveltejs/kit';
	import { onMount } from 'svelte';

	let { data }: { data: PageData } = $props();

	const product = $derived(data.product);

	let quantity = $state(1);
	let scrolled = $state(false);
	let showModal = $state(false);
	let isProductAlreadyAddedToCart = $state(false);

	function increment() {
		quantity++;
	}

	function decrement() {
		if (quantity > 1) quantity--;
	}

	function handleAddToCart() {
		const cart: Array<Product> = JSON.parse(localStorage.getItem('cart') ?? '[]');

		const newProduct = {
			...product,
			quantity: quantity
		};

		const products = [...cart, newProduct];

		localStorage.setItem('cart', JSON.stringify(products));

		showModal = true;
		isProductAlreadyAddedToCart = true;
	}

	$effect(function () {
		function onScroll() {
			scrolled = window.scrollY > 10;
		}
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	});

	onMount(function () {
		const cart: Array<Product> = JSON.parse(localStorage.getItem('cart') ?? '[]');
		const foundProduct = cart.find((p) => p.id === product.id);
		isProductAlreadyAddedToCart = !!foundProduct;
	});
</script>

<svelte:head>
	<title>Detalhes do Produto - Farmacias Economica</title>
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

<header class="top-bar" class:scrolled>
	<button aria-label="Voltar" class="icon-btn -ml-2" onclick={() => history.back()}>
		<span class="material-symbols-outlined icon-primary">arrow_back</span>
	</button>

	<div class="flex flex-1 justify-center">
		<span class="page-title">Detalhes do Produto</span>
	</div>

	<button aria-label="Ver carrinho" class="icon-btn relative -mr-2">
		<span class="material-symbols-outlined icon-primary">shopping_cart</span>
		<span class="cart-badge">2</span>
	</button>
</header>

<main class="main-canvas">
	<AddedToCartModal
		open={showModal}
		{product}
		onViewCart={function () {
			redirect(200, '/cart');
		}}
		onContinueShopping={function () {
			showModal = false;
		}}
		onClose={function () {
			showModal = false;
		}}
	/>

	<div class="product-grid">
		<!-- Product Image -->
		<section class="image-hero group">
			<div class="image-glow"></div>
			<img
				alt={product?.name ?? 'Produto'}
				class="product-image group-hover:scale-105"
				loading="lazy"
				decoding="async"
				src={productImageUrl(product?.images?.[0])}
			/>
		</section>

		<!-- Product Info & Actions -->
		<section class="product-info">
			<!-- Core Details -->
			<div class="flex flex-col gap-2">
				<span class="brand-label">{product?.brand ?? 'EMS'}</span>
				<h1 class="product-name">{product?.name ?? 'Paracetamol 500mg'}</h1>
				<p class="product-desc">
					{product?.description ?? 'Alívio de dor de cabeça e febre (20 comprimidos)'}
				</p>
			</div>

			<!-- Price & Quantity -->
			<div class="price-row">
				<div class="flex flex-col">
					<span class="product-price">
						{product?.price != null ? `R$ ${product.price.toFixed(2)}` : 'R$ 8,50'}
					</span>
					<span class="stock-label">Em estoque</span>
				</div>

				<div class="qty-control">
					<button
						aria-label="Diminuir quantidade"
						class="qty-btn"
						onclick={decrement}
						disabled={quantity <= 1}
					>
						<span class="material-symbols-outlined">remove</span>
					</button>
					<span class="qty-value">{quantity}</span>
					<button aria-label="Aumentar quantidade" class="qty-btn qty-btn-add" onclick={increment}>
						<span class="material-symbols-outlined">add</span>
					</button>
				</div>
			</div>

			<!-- Add to Cart / Already in Cart -->
			{#if isProductAlreadyAddedToCart}
				<div class="in-cart-wrapper">
					<div class="in-cart-control">
						<button class="in-cart-btn" aria-label="Diminuir quantidade no carrinho">
							<span class="material-symbols-outlined">remove</span>
						</button>
						<div class="in-cart-info">
							<span class="in-cart-qty">1</span>
							<span class="in-cart-label">No Carrinho</span>
						</div>
						<button class="in-cart-btn" aria-label="Aumentar quantidade no carrinho">
							<span class="material-symbols-outlined">add</span>
						</button>
					</div>
					<div class="in-cart-success">
						<span class="material-symbols-outlined in-cart-check">check_circle</span>
						<span class="in-cart-success-text">Item adicionado com sucesso</span>
					</div>
				</div>
			{:else}
				<button class="add-to-cart-btn" onclick={handleAddToCart}>
					<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1">
						shopping_cart
					</span>
					<span>Adicionar ao Carrinho</span>
				</button>
			{/if}

			<!-- Info Accordions -->
			<div class="mt-6 flex flex-col gap-4">
				<div class="info-card">
					<div class="info-card-header">
						<h3 class="info-card-title">Descrição</h3>
						<span class="material-symbols-outlined info-card-icon">info</span>
					</div>
					<p class="info-card-body">
						{product?.fullDescription ??
							'Indicado para a redução da febre e para o alívio temporário de dores leves a moderadas, tais como: dores associadas a gripes e resfriados comuns, dor de cabeça, dor de dente e dores musculares.'}
					</p>
				</div>

				<div class="info-card">
					<div class="info-card-header">
						<h3 class="info-card-title">Como Usar</h3>
						<span class="material-symbols-outlined info-card-icon">medication</span>
					</div>
					<p class="info-card-body">
						{product?.usage ??
							'Uso oral. Adultos e crianças acima de 12 anos: 1 a 2 comprimidos, 3 a 4 vezes ao dia. Não exceder o total de 8 comprimidos em 24 horas. Engolir com líquido.'}
					</p>
				</div>

				<div class="warning-card">
					<div class="mb-2 flex items-center gap-2">
						<span class="material-symbols-outlined warning-icon">warning</span>
						<h3 class="warning-title">Avisos Importantes</h3>
					</div>
					<p class="warning-body">
						{product?.warnings ??
							'Não use outro produto que contenha paracetamol. Consulte um médico se a dor persistir por mais de 10 dias ou a febre por mais de 3 dias.'}
					</p>
				</div>
			</div>
		</section>
	</div>
</main>

<style>
	:global(::-webkit-scrollbar) {
		width: 0px;
		background: transparent;
	}

	:global(body) {
		min-height: max(884px, 100dvh);
		background-color: #f9f9fc;
		color: #1a1c1e;
		font-family: 'Inter', sans-serif;
		display: flex;
		flex-direction: column;
		-webkit-font-smoothing: antialiased;
	}

	/* ── Header ── */
	.top-bar {
		background-color: #f9f9fc;
		border-bottom: 1px solid #c3c6d5;
		position: fixed;
		top: 0;
		z-index: 50;
		display: flex;
		height: 4rem;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 0 1rem;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
		transition: box-shadow 0.2s;
	}
	.top-bar.scrolled {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -2px rgba(0, 0, 0, 0.1);
	}

	.icon-btn {
		border-radius: 9999px;
		padding: 0.5rem;
		transition: background-color 0.2s;
		background: transparent;
		border: none;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.icon-btn:hover {
		background-color: #f3f3f6;
	}

	.icon-primary {
		color: #00357f;
		font-size: 28px;
	}

	.page-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 28px;
		font-weight: 700;
		color: #00357f;
	}

	.cart-badge {
		background-color: #ba1a1a;
		color: #fff;
		position: absolute;
		top: 0.25rem;
		right: 0.25rem;
		display: flex;
		height: 1rem;
		width: 1rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		font-size: 10px;
		font-weight: 700;
	}

	/* ── Main ── */
	.main-canvas {
		margin: 0 auto;
		width: 100%;
		max-width: 1280px;
		flex-grow: 1;
		padding-top: 72px;
		padding-bottom: 3rem;
	}

	.product-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0;
	}
	@media (min-width: 768px) {
		.product-grid {
			grid-template-columns: 1fr 1fr;
			gap: 3rem;
			padding: 0 3rem;
		}
	}
	@media (min-width: 1024px) {
		.product-grid {
			gap: 4rem;
		}
	}

	/* ── Image Hero ── */
	.image-hero {
		background-color: #f3f3f6;
		position: relative;
		display: flex;
		aspect-ratio: 1;
		width: 100%;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 2rem;
	}
	@media (min-width: 768px) {
		.image-hero {
			aspect-ratio: auto;
			height: 600px;
			border-radius: 1rem;
		}
	}

	.image-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top right, #f3f3f6, #f9f9fc);
		opacity: 0.5;
	}

	.product-image {
		position: relative;
		z-index: 10;
		max-height: 80%;
		max-width: 80%;
		object-fit: contain;
		mix-blend-mode: multiply;
		filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.15));
		transition: transform 0.5s ease-out;
	}

	/* ── Product Info ── */
	.product-info {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem 1rem;
	}
	@media (min-width: 768px) {
		.product-info {
			padding: 2rem 0;
		}
	}

	.brand-label {
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		line-height: 16px;
		font-weight: 600;
		color: #0061a4;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.product-name {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 32px;
		line-height: 40px;
		letter-spacing: -0.02em;
		font-weight: 700;
		color: #1a1c1e;
	}

	.product-desc {
		font-size: 16px;
		line-height: 24px;
		font-weight: 400;
		color: #434653;
		margin-top: 0.25rem;
	}

	/* ── Price Row ── */
	.price-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}

	.product-price {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 28px;
		line-height: 1;
		font-weight: 700;
		color: #00357f;
	}

	.stock-label {
		font-size: 12px;
		line-height: 16px;
		font-weight: 400;
		color: #434653;
		margin-top: 0.25rem;
		display: block;
	}

	.qty-control {
		background-color: #e8e8ea;
		border: 1px solid #c3c6d5;
		display: flex;
		align-items: center;
		border-radius: 9999px;
		padding: 0.25rem;
	}

	.qty-btn {
		display: flex;
		height: 2.5rem;
		width: 2.5rem;
		align-items: center;
		justify-content: center;
		border-radius: 9999px;
		border: none;
		background: transparent;
		color: #434653;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.qty-btn:hover {
		background-color: #e2e2e5;
	}
	.qty-btn:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.qty-btn-add {
		background-color: #f9f9fc;
		color: #00357f;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.qty-btn-add:hover {
		background-color: #e2e2e5;
	}

	.qty-value {
		font-size: 16px;
		line-height: 24px;
		font-weight: 600;
		color: #1a1c1e;
		width: 2rem;
		text-align: center;
	}

	/* ── Add to Cart Button ── */
	.add-to-cart-btn {
		background-color: #00357f;
		color: #fff;
		margin-top: 0.5rem;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
		border-radius: 0.75rem;
		padding: 1rem;
		border: none;
		cursor: pointer;
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 18px;
		font-weight: 600;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		transition:
			background-color 0.2s,
			box-shadow 0.2s,
			transform 0.1s;
	}
	.add-to-cart-btn:hover {
		background-color: #004aad;
		box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
	}
	.add-to-cart-btn:active {
		transform: scale(0.98);
	}

	/* ── In-Cart State ── */
	.in-cart-wrapper {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.in-cart-control {
		background-color: #00357f; /* primary */
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 0.75rem;
		padding: 0.5rem;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
	}

	.in-cart-btn {
		background: transparent;
		border: none;
		color: #fff;
		cursor: pointer;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		transition: background-color 0.15s;
		font-size: 24px;
	}
	.in-cart-btn:hover {
		background-color: #004aad;
	}

	.in-cart-info {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.in-cart-qty {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 20px;
		line-height: 1;
		font-weight: 700;
		color: #fff;
	}

	.in-cart-label {
		font-family: 'Inter', sans-serif;
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.85);
		margin-top: 2px;
	}

	.in-cart-success {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.25rem;
		color: #00357f;
	}

	.in-cart-check {
		font-size: 16px;
	}

	.in-cart-success-text {
		font-family: 'Inter', sans-serif;
		font-size: 12px;
		font-weight: 600;
		line-height: 16px;
	}

	/* ── Info Cards ── */
	.info-card {
		background-color: #fff;
		border: 1px solid #c3c6d5;
		border-radius: 0.75rem;
		padding: 1.25rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}
	.info-card:hover {
		background-color: #f3f3f6;
	}

	.info-card-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.info-card-title {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 18px;
		line-height: 28px;
		font-weight: 600;
		color: #1a1c1e;
	}

	.info-card-icon {
		color: #737784;
		transition: color 0.2s;
	}
	.info-card:hover .info-card-icon {
		color: #00357f;
	}

	.info-card-body {
		font-size: 14px;
		line-height: 1.625;
		font-weight: 400;
		color: #434653;
	}

	/* ── Warning Card ── */
	.warning-card {
		background-color: rgba(255, 218, 214, 0.2);
		border: 1px solid #ffdad6;
		border-radius: 0.75rem;
		padding: 1.25rem;
	}

	.warning-icon {
		color: #ba1a1a;
		font-size: 20px;
	}

	.warning-title {
		font-family: 'Inter', sans-serif;
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.01em;
		font-weight: 600;
		color: #ba1a1a;
	}

	.warning-body {
		font-size: 12px;
		line-height: 16px;
		font-weight: 400;
		color: #434653;
	}
</style>
