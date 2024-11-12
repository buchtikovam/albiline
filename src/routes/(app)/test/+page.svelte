<script lang="ts">
	import { testFormDef } from '$lib/data/autoform-def/zakaznici/testFormDef';
	import { _, locale } from 'svelte-i18n';
	import AutoFormNew from '$lib/components/form/AutoForm.svelte';
	import DetailPageLabel from '$lib/components/form/labels/DetailPageLabel.svelte';

	console.log(testFormDef);

	const translationRoute = "routes.test"
</script>

<div class="bg-white rounded-lg h-full p-4">
	<div class="flex gap-2">
		<div class="font-bold text-lg pb-2">
			{$_(translationRoute + '.header')}
		</div>

		<div class="flex gap-2 h-[28px]">
			<button
				class="px-1.5 bg-albi-500 font-bold text-white rounded-md text-xs"
				on:click={() => locale.set("cs")}
			>
				CZ
			</button>
			<button
				class="px-1.5 bg-albi-500 font-bold text-white rounded-md text-xs"
				on:click={() => locale.set("en")}
			>
				EN
			</button>
		</div>
	</div>


	<AutoFormNew
		translationRoute={translationRoute + ".autoform."}
		formDef={testFormDef}
	/>
</div>
