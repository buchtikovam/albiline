<script>
	let isPulsating = $state(true)
	let pulsate = $state(false)
</script>


<div class="text-albi-200" aria-label="signal-zero" role="img" >
	<svg xmlns="http://www.w3.org/2000/svg"
		 width="8"
		 height="8"
		 viewBox="0 0 24 24"
		 fill="fill"
		 stroke="currentColor"
		 stroke-width="2"
		 stroke-linecap="round"
		 stroke-linejoin="round"
		 class="lucide lucide-circle signal-icon fill-albi-200"
		 class:animate={pulsate}
	>
		<circle cx="12" cy="12" r="10" class="signal-level "/>
	</svg>
</div>



<style>
	.signal-icon {
		overflow: visible;
	}

	.signal-level {
		transition: opacity 0.1s ease;
	}

	.signal-icon.animate .signal-level {
		opacity: 0;
		animation: fadeInSequence 4s;
	}

	@keyframes fadeInSequence {
		0% {
			opacity: 1;
		}
		17% {
			opacity: 0;
		}
		33% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
		67% {
			opacity: 1;
		}
		83% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
