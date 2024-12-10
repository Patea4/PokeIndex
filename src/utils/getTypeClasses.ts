export const getTypeClasses = (type: string): string => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-medium";
  const typeStyles: { [key: string]: string } = {
    electric: "bg-yellow-400 text-white",
    water: "bg-blue-400 text-white",
    fire: "bg-red-400 text-white",
    grass: "bg-green-400 text-white",
    poison: "bg-purple-400 text-white",
    // Add more types as needed
  };

  return `${baseClasses} ${typeStyles[type.toLowerCase()] || 'bg-gray-300 text-gray-800'}`;
};
