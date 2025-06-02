<script lang="ts">
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>



<PageWrapper>

<!--	<TabFulltextWrapper>-->
<!--	</TabFulltextWrapper>-->




	<MainContentWrapper >
		{@render children?.()}
	</MainContentWrapper>
</PageWrapper>
