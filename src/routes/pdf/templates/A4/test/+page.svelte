<script lang="ts">
    import { page } from '$app/state';
    const id = page.params.id;

	let url = `https://picsum.photos/400/800`;
</script>

<div class="m-auto mt-4" style="width: 794px; height:1123px">
    <header>
        <div class="w-full h-20 bg-blue-500 border border-red-500">header</div>
	</header>

    <main>
        <!-- When using images define width and height, the image should be as larger as the scale of the PDF, in our case it is scale by html2canvas.scale: 4 -->
        <img src={url} width="100" height="200" alt="lorem ipsum" />
        {#each {length: 10} as _, i}
            <div class="w-full h-[200px] bg-green-500 border border-red-500">content {i + 1}</div>
        {/each}
    </main>

    <footer>
        <div class="w-full h-20 bg-red-500">footer</div>
    </footer>
</div>
