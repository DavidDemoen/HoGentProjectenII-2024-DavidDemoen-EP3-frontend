import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({ baseURL: baseUrl });

const simulateNetworkDelay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAll = async ({ url }) => {
  //await simulateNetworkDelay(5000);
  const { data } = await axios.get(`${url}`);
  //console.log(data);
  return data;
};

export const getAllFiltered = async (url, { arg: filters }) => {
  //await simulateNetworkDelay(5000);
  console.log(`Get all filtered: ${url}, ${filters}`);
  const { data } = await axios.get(`${url}`, { params: filters });
  return data;
};
export const getById = async ({ url }) => {
  //await simulateNetworkDelay(3000);
  console.log(`Get by id: ${url}`);
  const { data } = await axios.get(`${url}`);
  return data;
};
export const getByName = async (url, { arg: name }) => {
  //await simulateNetworkDelay(3000);
  console.log(`Get by name: ${url}/${name}`);
  const { data } = await axios.get(`${url}/${name}`);
  return data;
};
export const updateById = async (url, { arg: data }) => {
  const { id, ...values } = data;
  console.log(id);
  console.log(values);
  await axios.put(`${url}/${id}`, data);
};
export const deleteById = async (url, { arg: id }) => {
  console.log(`Delete by id: ${url}/${id}`);
  await axios.delete(`${url}/${id}`);
};
export const create = async (url, { arg }) => {
  console.log(`Create: ${url}, ${arg}`);
  const { data } = await axios.post(`${url}`, arg);
  return data;
};
export const post = async (url, { arg }) => {
  console.log(`Create: ${url}`);
  const { data } = await axios.post(`${url}`, arg);
  return data;
};
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};
