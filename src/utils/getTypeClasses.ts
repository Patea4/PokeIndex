export const getTypeClasses = (type: string): string => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-medium";
  const typeStyles: { [key: string]: string } = {
  };

  return `${baseClasses} ${typeStyles[type.toLowerCase()] || 'bg-gray-300 text-gray-800'}`;
};
