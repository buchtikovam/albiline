<script lang="ts">
	import FormContainer from "$lib/components/form/containers/FormContainer.svelte";
</script>

<div class="w-full h-full rounded-lg bg-white p-4">
	<div class="w-1/2">
		<p>Výchozí zobrazení</p>

		<FormContainer>
			<p>Tabulka</p>

			<p>Detaily</p>

			<p>Sidebar</p>

			<p>Ribbon</p>
		</FormContainer>
	</div>

	<div class="w-1/2">
		<p>Motiv</p>

		<FormContainer>
			<p>Modrá</p>

			<p>Růžová</p>

			<p>Žlutá</p>
		</FormContainer>
	</div>
</div>

