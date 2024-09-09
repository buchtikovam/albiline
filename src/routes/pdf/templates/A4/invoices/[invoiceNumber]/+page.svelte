<script lang="ts">
	import type { InvoiceData } from '$lib/types/pdf/invoiceData';
	import AlbiLogo from '$lib/icons/AlbiLogo.svelte';

	export let data: InvoiceData;

	const header = data.header || {};
	const items = data.items;
	const vat = data.vat;

	console.log(data);
	
</script>

<div 
	style="width: 797px; height: 1126px"
	class="m-auto border border-black bg-white"
>
    <header class="w-full">
		<div class="px-8 py-8" > <!-- header -->
			<div class="">
				<div class="mt-auto text-albi-500 absolute top-10">
					<AlbiLogo/>
				</div>

				<div class="flex justify-end gap-2 font-bold text-xl">
					<p class="text-black font-bold">
						FAKTURA
					</p>
					<p class="text-gray-500">
						{ header.documentCode || '{{documentCode}}' }
					</p>
				</div>
			</div>

			<p class="text-gray-500 text-sm float-end">Daňový doklad</p>
		</div>

		<div class="bg-albi-500 px-8 py-6 flex text-sm gap-20"> <!-- billing info -->
			<div>
				<p class="text-black ">
					Prosíme o zaplacení částky
				</p>
				<p class="text-black text-3xl font-bold">
					{ header.cena_final || "{{cena_final}}"} Kč
				</p>
			</div>

			
			<div class="flex gap-4">
				<div class="flex flex-col items-end">
					<p class="text-black">Bankovní účet</p>
					<p class="text-black">Variabilní symbol</p>
					<p class="text-black">Způsob platby</p>
				</div>

				<div>
					<p class="text-black">123</p>
					<p class="text-black">123</p>
					<p class="text-black">Převodem</p>
				</div>
			</div>

			
			
		</div>
		
		

		<div>
			<img src={`http://api.paylibo.com/paylibo/generator/czech/image?accountNumber=222885&bankCode=5500&amount=${header.cena_final}&currency=CZK&`} alt="invoiceQRCode" width="120px" height="120px"/>
		</div>

	</header>

    <main>
		<div class="w-full h-40">content</div>

    </main>

    <footer>
        <div class="w-full h-8">footer</div>
    </footer>
</div>