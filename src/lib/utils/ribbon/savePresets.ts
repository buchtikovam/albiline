import { presetStore } from '$lib/stores/tableStore';
import { get } from 'svelte/store';
import { apiServicePOST } from '$lib/api/apiService';
import { customToast } from '$lib/utils/customToast';


export async function savePresets(inputValue: string, url: string): Promise<void> {
	try {
		const presets = get(presetStore);

		if (presets.length > 0) {
			const toSave = {
				pageOrigin: url,
				presetName: inputValue,
				presets: presets
			};
			
			const response = await apiServicePOST('presets', toSave);

			if (response.ok) {
				customToast('Success', 'Šablona byla uložena')
			} else {
				customToast('Critical', 'Nepodařilo se uložit šablonu');
			} 

			presetStore.set([])
		} else {
			customToast("InfoToast", "Zde není co uložit")
		}
		
	} catch (error) {
		customToast('Critical', 'Nepodařilo se uložit šablonu')
		console.log(error);
	}
}
