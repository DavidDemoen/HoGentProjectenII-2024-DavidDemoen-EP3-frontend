const setQueryParamOnURL = (url, key, value) => {
  console.log(url);
  const urlObject = new URL(url);
  urlObject.searchParams.append(key, value);
  return urlObject.toString();
};

export { setQueryParamOnURL };
