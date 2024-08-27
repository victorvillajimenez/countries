import { TIMEOUT_SEC } from "../config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error(`Request took long! Timeout after ${s} seconds`));
    }, s * 1000);
  });
};

export const FETCH = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const response = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await response.json();

    // console.log(response, data);
    if (!response.ok) throw new Error(`${data.error}`);

    return data;
  } catch (err) {
    throw err;
  }
};
