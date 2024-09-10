<script lang="ts">
	import type { InvoiceData } from '$lib/types/pdf/invoiceData';
	import AlbiLogo from '$lib/icons/AlbiLogo.svelte';
	import { albiConst } from '$lib/constants/albiConst';

	export let data: { response: InvoiceData, url: string };
	
	const czk = new Intl.NumberFormat("cz", {
		style: "currency",
		currency: "CZK"
	})

	let header, items, vat;
	data.response.header === null ? header = {} : header = data.response.header;
	data.response.items === null ? items = {} : items = data.response.items;
	data.response.vat === null ? vat = {} : vat = data.response.vat;

	console.log(items);
</script>

<!-- TODO: cena final bug -->
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


		<div class="w-full mb-8 flex px-8 text-sm text-black">
			<div class="w-1/2">
				<h1 class="text-gray-500">DODAVATEL</h1>
				<h1 class="font-bold">{albiConst.name}</h1>
				<p>{albiConst.street},</p>
				<p>{albiConst.city}</p>
				<div class="flex gap-4">
					<p>IČ: {albiConst.ič}</p>
					<p>DIČ: {albiConst.dič}</p>
				</div>
				
			</div>

			<div class="w-1/2">
				<h1 class="text-gray-500">ODBĚRATEL</h1>
				<h1 class="font-bold">{ header.nazev_fa || "{{nazef_fa}}" }</h1>
				<p>{header.ulice_fa},</p>
				<p>{header.misto_fa}</p>
				<div class="flex gap-4">
					{#if header.ico !== null}
						<p>IČ: {header.ico || "{{ico}}"}</p>
					{/if}
					{#if header.ic_dph !== null}
						<p>DIČ: {header.ic_dph || "{{dic}}"}</p>
					{/if}
				</div>
				
			</div> 
		</div>
		
			
		<div class="flex">
			<div class="bg-albi-500 flex-1 px-8 py-6 flex text-sm gap-20"> <!-- billing info -->
				<div>
					<p class="text-black ">
						Prosíme o zaplacení částky
					</p>
					
					<p class="text-black text-3xl font-bold">
						{ header.cena_final ? czk.format(header.cena_final) : "{{cena_final}}" } 
					</p>
				</div>
				
				<div class="flex gap-4">
					<div class="flex flex-col items-end">
						<p class="text-black">Bankovní účet:</p>
						<p class="text-black">Variabilní symbol:</p>
						<p class="text-black">Způsob platby:</p>
					</div>

					<div>
						<p class="text-black">{ `${albiConst.accountNumber}/${albiConst.bankCode}`}</p>
						<p class="text-black">{ header.documentCode || "{{paymentReference}}"}</p>
						<p class="text-black">{ header.zpusob_platba || "{{zpusob_platba}}"}</p>
					</div>
				</div> 
			</div>

			<div class="w-fit mr-8">
				<img src={data.url} alt="qrcode" width="108px" height="108px" />
			</div>
		</div>
		
		<div class="px-8 pt-8">
			<p class="text-black text-sm">Fakturujeme vám za následující zboží:</p>

			<table class="mt-4 w-full bg-red-400">
				<thead>
					<td>Název</td>
					<td>EAN</td>
					<td>Počet</td>
					<td>Recykl. přísp</td>
					<td>Jedn. cena</td>
					<td>DPH</td>
					<td>Celkem bez DPH</td>
				</thead>
			</table>
		</div>
	
	</header>

    <main>
			
		<div class="px-8">
			<table class="w-full bg-red-600">
				<tbody>
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
					
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
					<tr>
						<td>test</td>
						<td>test</td>
						<td>test</td>
						<td>test</td>
					</tr>
				
				</tbody>
			</table>
		</div>

    </main>

    <footer>
        <div class="w-full h-20">footer</div>
    </footer>
</div>