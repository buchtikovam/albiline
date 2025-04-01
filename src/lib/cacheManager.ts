import { db } from './db';
import { compressData, decompressData, isError } from './compression';

export async function cacheTableData(tableId: string, data: unknown): Promise<void> {
	console.log("cacheTableData");


	try {
		const compressedData = await compressData(data);
		await db.compressedData.put({
			id: tableId,
			data: compressedData,
			timestamp: Date.now()
		});

		console.log("cacheTableData try");

	} catch (error) {
		if (isError(error)) {
			throw new Error(`Caching failed: ${error.message}`);
		}
		throw new Error('Unknown caching error');
	}
}

export async function getCachedTableData<T>(tableId: string): Promise<T | null> {
	console.log("getCachedTableData");

	try {
		const entry = await db.compressedData.get(tableId);
		if (!entry) return null;

		const decompressedData = await decompressData(entry.data);

		console.log("try getCachedTableData");

		return decompressedData as T;
	} catch (error) {
		if (isError(error)) {
			console.error(`Decompression failed: ${error.message}`);
		}
		return null;
	}
}

export async function clearCache(tableId?: string): Promise<void> {
	if (tableId) {
		await db.compressedData.delete(tableId);
	} else {
		await db.compressedData.clear();
	}
}

export async function getCacheAge(tableId: string): Promise<number | null> {
	console.log("getcacheAge");

	const entry = await db.compressedData.get(tableId);
	return entry?.timestamp ? Date.now() - entry.timestamp : null;
}
