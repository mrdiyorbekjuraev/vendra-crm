export const queryBuilder = (
	url: string,
	config: Record<string, string | number | boolean>,
): string => {
	if (Object.keys(config).length === 0) return url;

	const queryString = Object.entries(config)
		.map(
			([key, value]) =>
				`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
		)
		.join("&");

	return `${url}?${queryString}`;
};
