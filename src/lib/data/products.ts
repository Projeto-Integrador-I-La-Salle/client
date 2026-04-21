export type Category = {
	name: string;
	icon: string;
};

export type Filter = {
	label: string;
	active?: boolean;
};

export type Product = {
	brand: string;
	name: string;
	image: string;
	price: number;
	originalPrice?: number;
	sale?: boolean;
	rxRequired?: boolean;
};

export const categories: Category[] = [
	{ name: 'Vitamins', icon: 'pill' },
	{ name: 'Pain Relief', icon: 'healing' },
	{ name: 'First Aid', icon: 'medical_services' },
	{ name: 'Baby', icon: 'child_care' },
	{ name: 'Skin', icon: 'face' },
	{ name: 'Allergy', icon: 'respiratory_rate' },
	{ name: 'Fitness', icon: 'fitness_center' }
];

export const filters: Filter[] = [
	{ label: 'All', active: true },
	{ label: 'In Stock' },
	{ label: 'Rx Required' },
	{ label: 'Sale' }
];

export const products: Product[] = [
	{
		brand: 'NATURES BOUNTY',
		name: 'Vitamin D3 Immune Support 50mcg',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDI5dYyng39xrLwdOUi5qJAAfo3JRTWnZwESaVhkqdW09-vyWx_F2uHfr_Upt2fImAZfHFc3YOuQZDLuD5LsH-LpGwbbotdFN0rlmPHaKA7gxaIEEXE9QSZWk7swJWBiHSU0qvbXgeA6rnf2mhWaZdNfSlu2Ozkds2IiPq5n4t0NPGIEziWKa4lzXvMyEfVQnyF13Ql4HYHzqQKuh-WUp2s7QTTAPefLRjbKnKob-B8jJADVus4WT1vyivfph0TsI478o0FvnxDkcM',
		price: 14.5,
		originalPrice: 18.99,
		sale: true
	},
	{
		brand: 'VENTOLIN',
		name: 'Albuterol Sulfate Inhaler 90mcg',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCkRt2hQArL8IoGJJZKRg6PH5hBySbP22870CwUy0Ui5yPRxMl1HX41wpJuTSDqca5OGjvR6r-9vVVbOwCoMbDxcsn3RB-d22mcA_8A230pnLRuGQx5B07gjglihWsRIWFtKmBMKzzCQcspEzOalHch6vYidITJcuD_z_jE_sduWGEyP3XUPzQsWSw1ZKjhAT_Ex74Aw00S--slBjFSAGjiq5wEaZJGUuJxZQ9uUFnRf8dxaKetXqR8dWhmP_54w2FJfSG10nTOfKs',
		price: 32,
		rxRequired: true
	},
	{
		brand: 'BAYER',
		name: 'Extra Strength Aspirin (100ct Tablets)',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBCJH794spNuWKpmjQw01MGmvq5Ok-aiPy9QH479GKFQHajNX9LNB4n2zOxHdQnDZmt3IBwMET0u3Rtzm0Pr1hFReFNkgmczfmxhXPhLPOZ-RN-s4j1ajzfyeTuRiIZZmPUk9TWZJ3A38v0S5Zot-yDtafUrD_EIrT-eMSuwSWPabc8oTvMQG7jG3H0vXVe_6hDDq8p1YixgD7IJIQFITbB19WTNxJMQCwdlnlahJOnMGXmyGTdaZHKYSIQ6QRRYqcACpen0N5sXs8',
		price: 12.99
	},
	{
		brand: 'PURE ENCAPSULATIONS',
		name: 'Magnesium Glycinate Complex 120ct',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuChresKbEK5eN-6fW3vofNb2iQSU5s3C4Lo1wn4nAKLgYP7xH8sXplh4d7vsOQDj0jNv9fHqJIpDwuV-IMe46Lqe_jK3KDqgrx_XEUjdXTk2XxaeeGk_g_GpDHhD8aK8s9pglhKiQPAFFFHGhlI9MbtZP96bV5D0xda9WlhMZPIS5zGpbJfZCJFKZzdHZjAWDlr5V_doXqC3_R70UIsLr-bjeVJ94JhIp47lyrP7LC6lN6UpeZKvwZk1lk3In9ECnMkRaOTe1ghs8s',
		price: 28.4
	},
	{
		brand: 'CERAVE',
		name: 'Daily Moisturizing Lotion 12oz',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuD-uv3qsMc2LnPZkXcYI8Td7Krt3RgJqtCGNQ1L14kS75IGaEWTrTxGTAqXFnx6YbfunGgFNfL-Dnm1hXUPIkhmmSI-EPvNjd1b7jBLe2EdUTdQ0qE3CgJCOSqSf1vTuFcotrqIlqa597OBuzyuccyXM1IoGKwh3mxiTE460i0VcGuKyYjDWS_2_AItNEHDXOunspV551svMGxqaNjobPn7JQfi1Rr8Qfi73yN3Ux_Y1HKNGOvNNZaUGhTqoLgVJIocvnH0acEzTvg',
		price: 16.25
	},
	{
		brand: 'BAND-AID',
		name: 'Tough Strips Waterproof (20ct)',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDu3RRjUV-QEAPm8CNNfl66Jocf6vm_VBIA90MuxEwQ4l8prQbZvgB1l_dsMwLndriElWM8b6MYGRMCvARTkdf8EVC5Ttir8zNmDFn_nziTidnNgS7TkykKAYtWjJQSD9sYirZnbVht1lxo_i1EMkGWf16RSj_FNecUOq5QsUj1BjwF6iAnF3zf3axNDxWoCvYOAH6_JcHipO2Xtc-ZFmx05qSlNQvV99wSdmtT_ITGG1gtt7RJ41wRNsVZAA3sostGQzzzkFpmNPc',
		price: 8.99
	}
];
