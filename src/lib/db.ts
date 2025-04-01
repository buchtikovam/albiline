import Dexie from 'dexie';

export interface CompressedDataEntry {
	id: string;
	data: Blob;
	timestamp?: number;
}

class AppDatabase extends Dexie {
	public compressedData!: Dexie.Table<CompressedDataEntry, string>;

	constructor() {
		super('CompressedDataDB');

		this.version(1).stores({
			compressedData: 'id, timestamp'
		});

		this.version(2).upgrade(trans => {
			trans.table('compressedData').toCollection().modify(entry => {
				entry.timestamp = Date.now();
			});
		});

		console.log("db constructor")
	}
}

export const db = new AppDatabase();
