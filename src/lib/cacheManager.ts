import { db } from './db';
import { compressData, decompressData, isError } from './compression';


const CACHE_EXPIRATION_MS = 2 * 60 * 60 * 1000;


export async function cacheTableData(tableId: string, data: unknown): Promise<void> {
	try {
		const compressedData = await compressData(data);
		await db.compressedData.put({
			id: tableId,
			data: compressedData,
			timestamp: Date.now()
		});
	} catch (error) {
		if (isError(error)) {
			throw new Error(`Caching failed: ${error.message}`);
		}
		throw new Error('Unknown caching error');
	}
}



export async function getCachedTableData<T>(tableId: string): Promise<T | null> {
	try {
		const entry = await db.compressedData.get(tableId);
		if (!entry) return null;

		// Lazy expiration check - only when accessing the data
		const isExpired = (Date.now() - entry.timestamp) > CACHE_EXPIRATION_MS;

		if (isExpired) {
			console.log("expired")
			await db.compressedData.delete(tableId);
			return null;
		} else {
			console.log("live")
		}

		const decompressedData = await decompressData(entry.data);
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
	const entry = await db.compressedData.get(tableId);
	return entry?.timestamp ? Date.now() - entry.timestamp : null;
}


//
// export async function clearExpiredCache(): Promise<void> {
// 	try {
// 		const expirationThreshold = Date.now() - CACHE_EXPIRATION_MS;
// 		await db.compressedData
// 			.where('timestamp')
// 			.below(expirationThreshold)
// 			.delete();
// 	} catch (error) {
// 		console.error('Failed to clear expired cache:', error);
// 	}
// }
//


// Run cache cleanup periodically
// setInterval(clearExpiredCache, 60 * 60 * 1000); // Cleanup every hour
