export const excludeKey = (
	obj: Record<string, any>,
	keyToExclude: string
): Record<string, any> => {
	const { [keyToExclude]: _, ...rest } = obj;
	return rest;
};
