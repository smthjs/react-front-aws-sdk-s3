import axios from "./axios";

const url = "/api/files";

async function upload(fileData) {
  const {data} = await axios({
      method: "POST",
      url: `${url}/upload`,
      data: fileData,
      cache: false,
      contentType: false,
      processData: false,
  });

  return data;
}

async function download(params) {
  const {data} = await axios.get(`${url}/download`, {params});
  return data;
}

export default {
  upload,
  download,
};
