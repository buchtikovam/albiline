export function compareObjectsByFields(obj1: Record<string, any>, obj2: Record<string, any>, fields: string[]) {
	if (!obj1 || !obj2) {
		return false;
	}

	// Iterate through each field in the provided array
	for (const field of fields) {
		// Check if both objects have the field and if their values are numbers
		if (
			typeof obj1[field] === 'number' &&
			typeof obj2[field] === 'number' &&
			obj1[field] !== obj2[field]
		) {
			// If values are different, return false immediately
			return false;
		}
	}

	// If all fields match, return true
	return true;
}
