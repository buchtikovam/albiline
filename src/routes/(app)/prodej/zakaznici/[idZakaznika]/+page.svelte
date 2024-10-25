<script lang="ts">
	import { customerDetailFormDef } from '$lib/data/form/zakaznici/customerDetail';
	import { writable } from 'svelte/store';
	import { Switch } from "$lib/components/ui/switch";
	import * as Table from "$lib/components/ui/table";
	import * as Accordion from "$lib/components/ui/accordion";
	import type { CustomerData } from "$lib/types/tables/zakaznici";
	import AutoForm from '$lib/components/form/AutoForm.svelte';
	import SectionLabel from '$lib/components/form/labels/SectionLabel.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Command from "$lib/components/ui/command/index.js";
	import { Button } from "$lib/components/ui/button/index.js";

	import Mail from 'lucide-svelte/icons/mail';
	import Check from "lucide-svelte/icons/check";
	import * as Popover from "$lib/components/ui/popover/index.js";

	import ChevronsUpDown from "lucide-svelte/icons/chevrons-up-down";

	import { cn } from "$lib/utils.js";
	import { tick } from "svelte";

	export let data: { response: CustomerData };

	let formValues = writable(data.response)

	const frameworks = [
		{
			value: "dopravce",
			label: "Dopravce",
		},
		{
			value: "ucetni",
			label: "Účetní",
		},
		{
			value: "reditel",
			label: "Ředitel",
		},
	];

	let open = false;
	let value = "";

	$: selectedValue =
		frameworks.find((f) => f.value === value)?.label ??
		"Vyberte typ";

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>


<div class="h-full max-w-[1850px] overflow-auto p-3 md:p-4">
	<p class="font-bold w-full text-lg mb-2 md:mb-4">Detail zákazníka 123</p>

	<AutoForm autoform={customerDetailFormDef} bind:formValues/>

	<div class="">
		<SectionLabel name="Kontakty"/>

		<div class="mt-2">
			<Table.Root>
				<Table.Header class="border-b">
					<Table.Head>Výchozí</Table.Head>
					<Table.Head>Aktivní</Table.Head>
					<Table.Head>Typ kontaktu</Table.Head>
					<Table.Head>Jméno</Table.Head>
					<Table.Head>Příjmení</Table.Head>
					<Table.Head>Mobil</Table.Head>
					<Table.Head>Pevná linka</Table.Head>
					<Table.Head>Email</Table.Head>
					<Table.Head>Poznámka</Table.Head>
					<Table.Head>FA e-mailem</Table.Head>
					<Table.Head>DL e-mailem</Table.Head>
					<Table.Head>Avízo o svozu zásilky</Table.Head>
					<Table.Head>Avízo o expedici zásilky</Table.Head>
					<Table.Head>Poslední checkbox</Table.Head>
				</Table.Header>

				<Table.Body class="overflow-auto">
					<Table.Row>
						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>Dopravce</Table.Cell>

						<Table.Cell>Monika</Table.Cell>

						<Table.Cell>Buchtíková</Table.Cell>

						<Table.Cell>+420735882554</Table.Cell>

						<Table.Cell>+420735882554</Table.Cell>

						<Table.Cell>monika.buchtikova@albi.cz</Table.Cell>

						<Table.Cell>Poznámka 123456</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>Ředitel</Table.Cell>

						<Table.Cell>Jan</Table.Cell>

						<Table.Cell>Novák</Table.Cell>

						<Table.Cell>+420734512444</Table.Cell>

						<Table.Cell>+420734512444</Table.Cell>

						<Table.Cell >jan.novak@albi.cz</Table.Cell>

						<Table.Cell >Delší poznámka 123456</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>
					</Table.Row>

					<Table.Row>
						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>Účetní</Table.Cell>

						<Table.Cell>Jana</Table.Cell>

						<Table.Cell>Nováková</Table.Cell>

						<Table.Cell>+420737456777</Table.Cell>

						<Table.Cell>+420737456777</Table.Cell>

						<Table.Cell>jana.novakova@albi.cz</Table.Cell>

						<Table.Cell>Poznámečka</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell >
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>

						<Table.Cell>
							<div class="w-full flex">
								<Checkbox class="bg-slate-50"/>
							</div>
						</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>

		</div>

	</div>

<!--	<div class=" mt-4">-->
<!--		<p class="font-bold w-full text-lg mb-2 md:mb-2">Kontakty 2</p>-->

<!--		<Table.Root>-->
<!--			<Table.Header class="border-b">-->
<!--				<Table.Head>Výchozí</Table.Head>-->
<!--				<Table.Head>Aktivní</Table.Head>-->
<!--				<Table.Head>Typ kontaktu</Table.Head>-->
<!--				<Table.Head>Jméno</Table.Head>-->
<!--				<Table.Head>Příjmení</Table.Head>-->
<!--				<Table.Head>Mobil</Table.Head>-->
<!--				<Table.Head>Pevná linka</Table.Head>-->
<!--				<Table.Head>Email</Table.Head>-->
<!--				<Table.Head>Poznámka</Table.Head>-->
<!--				<Table.Head>FA e-mailem</Table.Head>-->
<!--				<Table.Head>DL e-mailem</Table.Head>-->
<!--				<Table.Head>Avízo o svozu zásilky</Table.Head>-->
<!--				<Table.Head>Avízo o expedici zásilky</Table.Head>-->
<!--				<Table.Head>Poslední checkbox</Table.Head>-->
<!--			</Table.Header>-->

<!--			<Table.Body class="overflow-auto">-->
<!--				<Table.Row>-->
<!--					<Table.Cell>-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell >-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell>-->
<!--						<Popover.Root bind:open let:ids>-->
<!--							<Popover.Trigger asChild let:builder>-->
<!--								<Button-->
<!--									builders={[builder]}-->
<!--									variant="ghost"-->
<!--									role="combobox"-->
<!--									aria-expanded={open}-->
<!--									class="justify-between h-6 px-0.5 hover:bg-white"-->
<!--								>-->
<!--									{selectedValue}-->
<!--									<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />-->
<!--								</Button>-->
<!--							</Popover.Trigger>-->
<!--							<Popover.Content class="p-0">-->
<!--								<Command.Root>-->
<!--									<Command.Input placeholder="Hledat..." />-->
<!--									<Command.Empty>No framework found.</Command.Empty>-->
<!--									<Command.Group>-->
<!--										{#each frameworks as framework}-->
<!--											<Command.Item-->
<!--												value={framework.value}-->
<!--												onSelect={(currentValue) => {-->
<!--													value = currentValue;-->
<!--													closeAndFocusTrigger(ids.trigger);-->
<!--												}}-->
<!--												class="h-fit flex gap-2 hover:bg-muted/50"-->
<!--											>-->
<!--												<Check-->
<!--													class={cn(-->
<!--														"size-4",-->
<!--														value !== framework.value && "text-transparent"-->
<!--													)}-->
<!--												/>-->
<!--												{framework.label}-->
<!--											</Command.Item>-->
<!--										{/each}-->
<!--									</Command.Group>-->
<!--								</Command.Root>-->
<!--							</Popover.Content>-->
<!--						</Popover.Root>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell>Monika</Table.Cell>-->

<!--					<Table.Cell>Buchtíková</Table.Cell>-->

<!--					<Table.Cell>+420735882554</Table.Cell>-->

<!--					<Table.Cell>+420735882554</Table.Cell>-->

<!--					<Table.Cell>monika.buchtikova@albi.cz</Table.Cell>-->

<!--					<Table.Cell>Poznámka 123456</Table.Cell>-->

<!--					<Table.Cell >-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell >-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell>-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell>-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->

<!--					<Table.Cell>-->
<!--						<div class="w-full flex">-->
<!--							<Switch />-->
<!--						</div>-->
<!--					</Table.Cell>-->
<!--				</Table.Row>-->
<!--			</Table.Body>-->
<!--		</Table.Root>-->
<!--	</div>-->

</div>


<style>
	::-webkit-scrollbar {
		width: 0px;
		height: 0px;
	}
</style>
