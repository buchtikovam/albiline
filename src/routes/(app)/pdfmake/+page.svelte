<!-- <script lang="ts">
	import PdfPrinter from 'pdfmake';
	import blobStream, { type IBlobStream } from 'blob-stream';
	import type { TDocumentDefinitions } from 'pdfmake/interfaces';

	const printer = new PdfPrinter();

	async function generatePdf(): Promise<Blob> {

		const file: TDocumentDefinitions = {
			content: ["test"]
		};

		return new Promise((resolve, reject) => {
			const pdf = printer.createPdfKitDocument(file);

			pdf
				.pipe(blobStream())
				.on('finish', function (this: IBlobStream) {
					console.log('Finished generating PDF');
					resolve(this.toBlob('application/pdf'));
				})
				.on('error', (err) => {
					console.error('err', err);
					reject(err);
				});

			pdf.end();
		});
	}
</script>

<button on:click={() => generatePdf()}>
	Generate pdf
</button> -->