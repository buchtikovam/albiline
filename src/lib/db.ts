import Dexie from 'dexie';

export interface CompressedDataEntry {
	id: string;
	data: Blob;
	timestamp: number; // Always store timestamp
}

class AppDatabase extends Dexie {
	public compressedData!: Dexie.Table<CompressedDataEntry, string>;

	constructor() {
		super('CompressedDataDB');

		this.version(3).stores({
			compressedData: 'id, timestamp'
		});
	}
}

export const db = new AppDatabase();
