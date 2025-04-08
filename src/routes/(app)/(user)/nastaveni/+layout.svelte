<script lang="ts">
	import MainContentWrapper from "$lib/components/wrapper/MainContentWrapper.svelte";
	import TabFulltextWrapper from "$lib/components/wrapper/TabFulltextWrapper.svelte";
	import PageWrapper from "$lib/components/wrapper/PageWrapper.svelte";
	import * as Tabs from "$lib/components/ui/tabs/index.js";
	import TabSeparator from "$lib/components/tabs/TabSeparator.svelte";
</script>




<PageWrapper>
	<TabFulltextWrapper>
		<Tabs.Root value="account" class="">
			<Tabs.List class="border border-slate-300">
				<Tabs.Trigger value="account">
					Účet
				</Tabs.Trigger>
				<TabSeparator/>

				<Tabs.Trigger value="table">
					Tabulka
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</TabFulltextWrapper>


	<MainContentWrapper>
		.
	</MainContentWrapper>
</PageWrapper>

