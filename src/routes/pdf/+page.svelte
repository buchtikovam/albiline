<script lang="ts">
    import PdfPrintButton from '$lib/components/pdf/PdfPrintButton.svelte';
</script>

<div class="p-8">
	<div class="border">
		<PdfPrintButton url="/pdf/templates/A4/test" />
		: test
	</div>

	<div class="border">
		<PdfPrintButton url="/pdf/templates/A4/invoices/202414294" />
		: invoice small
	</div>
</div>
