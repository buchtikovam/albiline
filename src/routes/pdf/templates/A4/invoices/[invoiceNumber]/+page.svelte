<!-- @migration-task Error while migrating Svelte code: `<td>` is invalid inside `<thead>` -->
<script lang="ts">
	import AlbiLogo from '$lib/icons/AlbiLogo.svelte';
	import type { InvoiceData, InvoiceItem } from '$lib/types/pdfs/invoiceData';
	import { parseStringToDate } from '$lib/utils/formatting/parseStringToDate';
	import { currencyCZ } from '$lib/constants/currency-formatters/currency-cz';
	import { getVAT } from '$lib/utils/formatting/getVAT';
	import { albiInfo } from '$lib/constants/info/albiInfo';
	import { A4 } from '$lib/constants/pdf/pageSizes';

	export let data: { response: InvoiceData, qrCode: string };

	let header;
	let items: InvoiceItem[];
	let vat;

	if (Object.keys(data).length > 0) {
		data.response.header === null ? header = {} : header = data.response.header;
		data.response.items === null ? items = [] : items = data.response.items;
		data.response.vat === null ? vat = {} : vat = data.response.vat;
	} else {
		header = {};
		items = [];
		vat = {};
	}

	let vatArr: { sazbaDph: number, cenaBezDph: number, dph: number, cenaSDph: number}[];
	let vatSummary: { cenaBezDph: number, dph: number, cenaSDph: number};
	
	if (vat && Object.keys(vat).length > 0) {
		vatArr = getVAT(vat);

		const soucetBezDhp = vatArr.reduce((acc, el) => acc + el.cenaBezDph, 0)
		const soucetDph = vatArr.reduce((acc, el) => acc + el.dph, 0)
		const soucetSDph = vatArr.reduce((acc, el) => acc + el.cenaSDph, 0)

		vatSummary = {
			cenaBezDph: soucetBezDhp,
			dph: soucetDph,
			cenaSDph: soucetSDph
		}; 
	}
</script>

<!-- svelte-ignore hydration_attribute_changed -->
<div 
	style={`width: ${A4.width}px; height: ${A4.height}px`}
	class="m-auto bg-white"
>
    <header class="w-full">
		<div class="px-8 py-8" > <!-- header -->
			<div>
				<div class="mt-auto text-albi-500 absolute top-10">
					<AlbiLogo/>
				</div>

				<div class="flex justify-end gap-2 font-bold text-xl">
					<p class="text-slate-950 font-bold">
						FAKTURA
					</p>
					<p class="text-slate-500">
						{ header.documentCode || '{{documentCode}}' }
					</p>
				</div>
			</div>

			<p class="text-gray-500 text-sm float-end">Daňový doklad</p>
		</div>

		<div class="w-full mb-8 flex px-8 text-sm text-slate-950"> <!-- dodavatel + odběratel info -->
			<div class="w-1/3">
				<h1 class="text-slate-500">DODAVATEL</h1>
				<h1 class="font-bold">{albiInfo.name}</h1>
				<p>{albiInfo.street},</p>
				<p>{albiInfo.city}</p>
				<p>IČ: {albiInfo.ič}</p>
				<p>DIČ: {albiInfo.dič}</p>
			</div>

			<div class="w-1/3 pl-8">
				<h1 class="text-slate-500">ODBĚRATEL</h1>
				<h1 class="font-bold">{ header.nazev_fa || "{{nazef_fa}}" }</h1>
				<p>{header.ulice_fa || "{{ulice_fa}}"},</p>
				<p>{header.misto_fa || "{{misto_fa}}"}</p>
				{#if header.ico !== null}
					<p>IČ: {header.ico || "{{ico}}"}</p>
				{/if}
				{#if header.ic_dph !== null}
					<p>DIČ: {header.ic_dph || "{{ic_dph}}"}</p>
				{/if}
			</div> 

			<div class="w-1/3 pl-8">
				<h1 class="text-slate-500">MÍSTO DODÁNÍ</h1>
				<h1 class="font-bold">{ header.mdnazev || "{{mdnazev}}" }</h1>
				<p>{header.jmeno || "{{jmeno}}"}</p>
				<p>{header.mdulice || "{{mdulice}}"},</p>
				<p>{header.mdmisto || "{{mdmisto}}"}</p>
			</div> 
		</div>

		<div class="flex text-xs gap-10 pb-0.5 ml-8 text-slate-950"> <!-- dates -->
			<p>Datum zd. plnění: <b>{ header.datplneni ? parseStringToDate(header.datplneni) : "{{datplneni}}" }</b></p>
			<p>Datum vystavení: <b>{ header.datprod ? parseStringToDate(header.datprod) : "{{datprod}}"}</b></p>
			<p>Datum splatnosti: <b>{ header.datsplat ? parseStringToDate(header.datsplat) : "{{datsplat}}"}</b></p>
		</div>
		
		<div class="flex"> <!-- billing info -->
			<div class="bg-albi-500 flex-1 px-8 py-6 flex text-sm gap-20 mr-4"> 
				<div class="text-slate-50">
					<p>
						Prosíme o zaplacení částky
					</p>
					
					<p class="text-3xl font-bold">
						{ header.cena_final ? currencyCZ.format(header.cena_final) : "{{cena_final}}" } 
					</p>
				</div>
				
				<div class="flex gap-4 text-slate-50">
					<div class="flex flex-col items-end">
						<p>Bankovní účet:</p>
						<p>Variabilní symbol:</p>
						<p>Způsob platby:</p>
					</div>

					<div>
						<p>{ `${albiInfo.accountNumber}/${albiInfo.bankCode}`}</p>
						<p>{ header.documentCode || "{{paymentReference}}"}</p>
						<!-- svelte-ignore hydration_attribute_changed -->
						<p>{ header.zpusob_platba || "{{zpusob_platba}}"}</p>
					</div>
				</div> 
			</div>

			<div class="w-fit mr-8">
				<img src={data.qrCode} alt="qrcode" width="108px" height="108px" />
			</div>
		</div>
		
		<div class="px-8 pt-8"> <!-- thead -->
			<p class="text-slate-950 text-xs pb-4">Fakturujeme Vám za následující zboží:</p>

			<table class="w-full">
				<thead class="text-[10px] font-bold text-center text-slate-950 border-b-2 border-albi-500">
<!--					<td class="">Název</td>-->
<!--					<td class="w-24">EAN</td>-->
<!--					<td class="w-16">Počet</td>-->
<!--					<td class="w-20">Recykl. přísp.</td>-->
<!--					<td class="w-16">Jedn. cena</td>-->
<!--					<td class="w-16">DPH</td>-->
<!--					<td class="w-24">Celkem bez DPH</td>-->
				</thead>
			</table>
		</div>
	</header>


    <main>	
		<div class="px-8"> <!-- tbody -->
			<table class="w-full">
				<tbody>
					{#each items as item (item)}
					   <tr class="text-xs text-slate-950 border-b">
							<td class="pb-0.5">
								{item.popis}
							</td>
							<td class="w-24 text-left pb-0.5">
								{item.ean !== null ? item.ean : ""}
							</td>
							<td class="w-16 text-right pb-0.5">
								{item.quantity} ks
							</td>
							<td class="w-20 text-center pb-0.5">
								{item.recyclingfee_cz !== null ? item.recyclingfee_cz : ""}
							</td>
							<td class="w-16 text-right pb-0.5">
								{currencyCZ.format(item.cena_rabat)}
							</td>
							<td class="w-16 text-right pb-0.5">
								{item.sazba_dph}%
							</td>
							<td class="w-24 text-right pb-0.5">
								{currencyCZ.format(item.celkem)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="my-8 px-8 flex"> <!-- vat -->
			<div class="w-1/2 text-xs font-bold text-slate-950">
				Razítko a podpis: 
			</div>

			<div class="w-1/2">
				<table class="w-full">
					<thead class="text-[10px] text-center font-bold border-b-2 border-albi-500 text-slate-950">
<!--						<td>Sazba DPH</td>-->
<!--						<td>Bez DPH</td>-->
<!--						<td>DPH</td>-->
<!--						<td>Celkem</td>-->
					</thead>
					<tbody>
						{#if vatArr !== undefined}
						   {#each vatArr as vatObject (vatObject)}
								<tr class="text-xs text-right border-b text-slate-950">
									<td class="pb-0.5">{vatObject.sazbaDph}%</td>
									<td class="pb-0.5">{currencyCZ.format(vatObject.cenaBezDph)}</td>
									<td class="pb-0.5">{currencyCZ.format(vatObject.dph)}</td>
									<td class="pb-0.5">{currencyCZ.format(vatObject.cenaSDph)}</td>
								</tr>
							{/each}

							<tr class="text-xs text-slate-950 border-b font-bold text-right">
								<td class="pb-0.5">Celkem:</td>
								<td class="pb-0.5">{currencyCZ.format(vatSummary.cenaBezDph)}</td>
								<td class="pb-0.5">{currencyCZ.format(vatSummary.dph)}</td>
								<td class="pb-0.5">{currencyCZ.format(vatSummary.cenaSDph)}</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
    </main>


    <footer>
        <div class="w-full px-8 pb-8 pt-4 text-xs text-center text-slate-950 leading-4">
			<p>Děkujeme Vám za objednávku a těšíme se na další spolupráci. </p>
			<p class="text-[10px] text-slate-500">Kontakt: {header.dealer || "{{dealer}}"}</p>
			<p class="text-[10px] text-slate-500">{albiInfo.or}</p>
		</div>
    </footer>
</div>
