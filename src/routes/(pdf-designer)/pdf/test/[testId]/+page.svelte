<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let element: HTMLElement | null;

	let data = {
		invoiceNumber: 147258369,
		orderNumber: 3692581475,
	}

	onMount(() => {	
		element = document.getElementById('element-to-print');
	})

	function printing() {
        const content = document.getElementById('content');
		const filename = 'table_data.pdf';

		var opt = {
			margin: 0,
			filename: `faktura-${data.invoiceNumber}.pdf`,
			image: { type: 'jpeg', quality: 1 },
			html2canvas: {
				dpi: 300,
				scale: 4,
				letterRendering: true,
				useCORS: true
			},
			jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		};
		html2pdf().set(opt).from(content).save();
	}
	
</script>


<svelte:head>
	<script src=
		"https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js">
    </script>
</svelte:head>

<div class="overflow-auto p-8 flex flex-col justify-center items-center">
	
	<div class="flex gap-12">
		<button on:click={() => goto("/")}>
			Zpět
		</button>


		<button on:click={() => printing()}>
			Stáhnout PDF
		</button>
	</div>
	
	<div id="content" class=" w-[21cm] h-[29.68cm] p-8 bg-white border text-black">
		<div class="flex justify-end gap-32">
			<p class="text-xl font-bold">
				FAKTURA - daňový doklad
			</p>

			<p class="text-xl font-bold">
				{data.invoiceNumber}
			</p>
		</div>

		<p class="text-sm text-center">Objednávka č. {data.orderNumber}</p>
		

    </div>

</div>
	