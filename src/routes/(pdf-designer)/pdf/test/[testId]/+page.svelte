<script lang="ts">
	function print() {
        html2pdf()
          .set({
            image: { type: "jpeg", quality: 1 },
            pagebreak: {mode: 'css',},
            html2canvas: { scale: 4 },
            jsPDF: { unit: "mm", format: "A4", orientation: "portrait" },
          })
          .from(document.getElementsByTagName("pdf")[0])
          .save("faktura.pdf");
      }
</script>


<svelte:head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
</svelte:head>

<button class="print" on:click={() => print()}>Stáhnout PDF</button>



<pdf>
	<header>header</header>

	<content>
		<ul class="list">
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
			<li>Item</li>
		</ul>
	</content>

	<footer>footer</footer>
</pdf>


 <style>
      @page {
        size: A4;
        margin: 0;
      }
      .print {
        position: absolute;
        top: 50px;
        right: 50px;
	  }
      pdf > header {
        position: fixed;
        width: 100%;
        top: 0;
        height: 20px;
        background: red;
      }
      pdf > footer {
        position: fixed;
        width: 100%;
        bottom: 0;
        height: 40px;
        background: blue;
      }
      pdf > content {
        padding-top: 20px;
        padding-bottom: 40px;
      }
</style>