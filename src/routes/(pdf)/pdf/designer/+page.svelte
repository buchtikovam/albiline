<script lang="ts">
	import { onMount } from 'svelte';
  // @ts-ignore
  import WebViewer from '@compdfkit_pdf_sdk/webviewer';

  /**
   * @type {HTMLDivElement}
   */
  let container;
  let docViewer;

  onMount(async () => {

    await WebViewer.init({
      pdfUrl: './example/developer_guide_web.pdf',
      license: 'NjZkMzBlOTE3MDMwNg=='
    }, container).then((/** @type {{ docViewer: any; }} */ instance) => {
      docViewer = instance.docViewer;

      docViewer.addEvent('documentloaded', () => {
        console.log('document loaded');
      });
    });
  });
</script>

<body>
  <div bind:this={container} style="height: 100vh; width: 100%; overflow: hidden;" />
</body>
