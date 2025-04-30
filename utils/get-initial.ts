export function getInitials(name: string): string {
	if (!name) return "";

	const words = name.trim().split(/\s+/);

	if (words.length === 1) {
		// Single word: return first 2 letters
		return words[0].slice(0, 1).toUpperCase();
	}

	// Multi-word: first letter of first and last word
	const first = words[0][0];
	const last = words[words.length - 1][0];

	return (first + last).toUpperCase();
}
