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
export const getById = async ({ url }) => {
  //await simulateNetworkDelay(3000);
  console.log(`Get by id: ${url}`);
  const { data } = await axios.get(`${url}`);
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
export const create = async (url, { arg: data }) => {
  console.log(`Create: ${url}`);
  await axios.post(`${url}`, data);
};
