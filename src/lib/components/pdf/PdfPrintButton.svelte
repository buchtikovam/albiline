<script lang="ts">
	import { jsPDF } from "jspdf";
	import { onMount } from "svelte";

	export let url: string;
	let html2pdf: any;

	onMount(async () => {
		html2pdf = (await import('html2pdf.js')).default
	});

	async function print() {
		const options = {
			margin: 0,
			enableLinks: true,
			image: {
				type: "jpeg",
				quality: 1,
			},
			html2canvas: {
				scale: 4,
				letterRendering: true,
				allowTaint: true,
				backgroundColor: null,
				useCORS: true,
			},
			pagebreak: {
				mode: [
					"avoid-all",
					"css",
					"legacy",
				],
			},
			jsPDF: {
				unit: "px",
				format: [794, 1123], // A4
				orientation: "portrait",
				compressPDF: true,
			},
		};

		const load = document.createElement('iframe') as HTMLIFrameElement
		document.body.appendChild(load);
		load.classList.add('w-[0px]', 'h-[0px]');

		load.src = url;
		load.onload = async () => {
			const loadWindow = load.contentWindow as Window;

			const header = loadWindow.document.body.getElementsByTagName("header")[0];
			const main = loadWindow.document.body.getElementsByTagName("main")[0];
			const footer = loadWindow.document.body.getElementsByTagName("footer")[0];

			await html2pdf()
				.set({
					...options,
					margin: [
						Math.round(header.getBoundingClientRect().height),
						0,
						Math.round(footer.getBoundingClientRect().height),
						0,
					],
				})
				.from(main)
				.toPdf()
				.get("pdf")
				.then(async function(pdf: jsPDF) {
					const theadImage = await html2pdf().set(options).from(header).outputImg("datauristring");
					const tfootImage = await html2pdf().set(options).from(footer).outputImg("datauristring");

					for (let page = 1; page < pdf.internal.pages.length; page++) {
						const width = Math.round(pdf.internal.pageSize.width);
						const height = Math.round(pdf.internal.pageSize.height);
						pdf.setPage(page);

						pdf.addImage(
							theadImage,
							'PNG',
							0,
							0,
							Math.round(header.getBoundingClientRect().width),
							Math.round(header.getBoundingClientRect().height),
						);

						pdf.addImage(
							tfootImage,
							'PNG',
							0,
							height - Math.round(footer.getBoundingClientRect().height),
							Math.round(footer.getBoundingClientRect().width),
							Math.round(footer.getBoundingClientRect().height)
						);
					}

					pdf.save('file.pdf');
				});
			load.remove();
		}
	}
</script>

<button on:click={() => print()}>Print</button>
