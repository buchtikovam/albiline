<script lang="ts">
	import {disableNavigation, disablePageTabs} from "$lib/runes/navigation.svelte";
	// import {i18n} from "$lib/i18n";
	import {goto} from "$app/navigation";
	import * as Tabs from "$lib/components/ui/tabs/index.js";

	interface Props {
		activeTab: string;
		label: () => string;
		value: string;
		url: string;
	}

	let {
		activeTab,
		label,
		value,
		url = $bindable()
	}: Props = $props()
</script>



<div
	class="w-full flex items-center justify-between"
>

</div>


<!--<Tabs.Trigger-->
<!--	class="font-bold"-->
<!--	disabled={activeTab !== "0" && (disableNavigation.value || disablePageTabs.value)}-->
<!--	value={value}-->
<!--	onclick={() => {-->
<!--		goto(i18n.resolveRoute(url));-->
<!--	}}-->
<!--&gt;-->
<!--	{label()}-->
<!--</Tabs.Trigger>-->
