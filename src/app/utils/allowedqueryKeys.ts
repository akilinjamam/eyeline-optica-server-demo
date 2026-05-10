export const allowedQueryKeys = (allowdKeys: string[], query: Record<string, any>): any => {
	const clean: Record<string, any> = {};

	for (const key of allowdKeys) {
		if (query[key] !== undefined) {
			clean[key] = query[key];
		}
	}
	return clean;
};
