<script lang="ts">
	import type { InvoiceData } from '$lib/types/pdf/invoiceData';
	import AlbiLogo from '$lib/icons/AlbiLogo.svelte';
	import { albiConst } from '$lib/constants/albiConst';
	import { onMount } from 'svelte';

	export let data: { data: InvoiceData, url: string };
	console.log(data);
	

	const header = data.data.header || {};
	const items = data.data.items;
	const vat = data.data.vat;


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

		<div class="flex">
			<div class="bg-albi-500 flex-1 px-8 py-6 flex text-sm gap-20"> <!-- billing info -->
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
						<p class="text-black">Bankovní účet:</p>
						<p class="text-black">Variabilní symbol:</p>
						<p class="text-black">Způsob platby:</p>
					</div>

					<div>
						<p class="text-black">{`${albiConst.accountNumber}/${albiConst.bankCode}`}</p>
						<p class="text-black">{ header.documentCode || "{{paymentReference}}"}</p>
						<p class="text-black">{ header.zpusob_platba || "{{zpusob_platba}}"}</p>
					</div>
				</div> 
			</div>
		
		
			<div class="w-fit mr-8">
				<img src={data.url} alt="qrcode" width="108px" height="108px" />
			</div>

		<div class="bg-albi-400 h-20">
			<div class=""></div>
		</div>
		

	</header>

    <main>
		<div class="w-full h-40">content</div>

    </main>

    <footer>
        <div class="w-full h-8">footer</div>
    </footer>
</div>