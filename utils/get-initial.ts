/**
 * Get initials from a name
 * @param name - The full name to extract initials from
 * @param count - Number of initials to return (default: 2)
 * @param singleWordLetters - Number of letters to take from a single word (default: 1)
 * @returns The initials as uppercase string
 */
export function getInitials(
	name: string, 
	count: number = 2, 
	singleWordLetters: number = 1
  ): string {
	if (!name || typeof name !== 'string') return "";
  
	const words = name.trim().split(/\s+/).filter(word => word.length > 0);
	
	if (words.length === 0) return "";
	
	// Case 1: Single word
	if (words.length === 1) {
	  return words[0].slice(0, singleWordLetters).toUpperCase();
	}
	
	// Case 2: Multiple words
	let initials = "";
	
	// If count is greater than words length, we can only return as many initials as words
	const actualCount = Math.min(count, words.length);
	
	if (actualCount === 1) {
	  // Special case: just the first letter of the first word
	  initials = words[0][0];
	} else if (actualCount === 2) {
	  // Common case: first letter of first and last word
	  initials = words[0][0] + words[words.length - 1][0];
	} else {
	  // More than 2 initials requested - get first letter of first 'count' words
	  for (let i = 0; i < actualCount; i++) {
		initials += words[i][0];
	  }
	}
  
	return initials.toUpperCase();
  }
