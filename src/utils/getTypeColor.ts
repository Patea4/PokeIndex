export const getTypeColor = (type: string): string => {
  const baseClasses = "px-2 py-1 rounded-full text-sm font-medium";
  const typeStyles: { [key: string]: string } = {
    normal : "bg-[#A8A77A]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    grass: "bg-[#7AC74C]",
    electric: "bg-[#F7D02C]",
    ice: "bg-[#96D9D6]",
    fighting: "bg-[#C22E28]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    flying: "bg-[#A98FF3]",
    psychic: "bg-[#F95587]",
    bug: "bg-[#A6B91A]",
    rock: "bg-[#B6A136]",
    ghost: "bg-[#735797]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    steel: "bg-[#B7B7CE]",
    fairy: "bg-[#D685AD]",
  };

  return `${baseClasses} ${typeStyles[type.toLowerCase()] || 'bg-gray-300 text-gray-800'}`;
};
