export const transformGeneration = (generation: string): string => {
  const match = generation.match(/^generation-(viii|vii|vi|v|iv|i{1,3})$/i);
  if (match) {
    // Convert the matched Roman numeral to uppercase
    return match[1].toUpperCase();
  }
  console.warn(`Unrecognized generation format: "${generation}"`);
  return 'Unknown'; // Fallback for unrecognized formats
};
