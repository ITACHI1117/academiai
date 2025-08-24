export const getInitials = (name: string) => {
  name
    ?.split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .filter((_, i, arr) => i === 0 || i === arr.length - 1) // keep only first + last
    .join("")
    .toUpperCase() || "";
  return name;
};
