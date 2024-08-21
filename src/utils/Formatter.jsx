const removeSpaces = (string) => {
  return string.replace(/\s/g, "");
};
const firstCharToUpperCase = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export { removeSpaces, firstCharToUpperCase };
