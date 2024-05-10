// sklad

<script>
	let myElement;
	function handleResize() {

		console.log('Element resized:', myElement.clientWidth, myElement.clientHeight);
	}

	function setWidth() {
		let div = document.querySelector(".test");

		div?.setAttribute("style", "width: 200px")

		handleResize()
	}

</script>

<button on:mount={handleResize} on:click={setWidth} class="test bg-red-400" bind:this={myElement}>
	hello
</button>


<button on:mount={handleResize} on:click={setWidth} class="test bg-red-400" bind:this={myElement}>
	hello
</button>
