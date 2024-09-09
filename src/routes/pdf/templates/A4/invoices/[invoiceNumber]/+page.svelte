<script lang="ts">
	import type { InvoiceData } from '$lib/types/pdf/invoiceData';
	import AlbiLogo from '$lib/icons/AlbiLogo.svelte';

	export let data: InvoiceData;

	const header = data.header;
	const items = data.items;
	const vat = data.vat;
</script>

<div style="width: 797px; height: 1126px" class="bg-white text-black border border-black mx-auto my-4">
    <header class="w-full h-6 bg-red-100">
		<div class="text-black text-[16px] m-0 bg-red-500 w-fit">FAKTURA</div>
	</header>

    <main>
		<div class="w-full h-8">content</div>
    </main>

    <footer>
        <div class="w-full h-8">footer</div>
    </footer>
</div>