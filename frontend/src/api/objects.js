import axios from "./axios";

const url = "/api/objects";

async function fetch(params) {
  const {data} = await axios.get(url, {params});
  return data;
}

async function remove(params) {
  const {data} = await axios.delete(url, {params});
  return data;
}

export default {
  fetch,
  remove,
};
