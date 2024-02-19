import { useState } from "react";

const baseUrl = "";

let updatedBaseUrl = baseUrl;
const useFetch = (updatedUrl = "") => {
  const [isLoading, setIsloading] = useState(false);

  updatedBaseUrl = updatedUrl ? updatedUrl : updatedBaseUrl;

  const sendingReq = async (reqConfigs) => {
    setIsloading(true);
    try {
      const promises = reqConfigs.map((reqConfig) => {
        const { endPoint, method, headers, body } = reqConfig;
        const url = `${updatedBaseUrl}${endPoint}`;
        return fetch(url, {
          method: method ? method : "GET",
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null,
        });
      });

      const responses = await Promise.all(promises);
      const data = await Promise.all(responses.map((res) => res.json()));
      return data;
    } catch (error) {
      throw new Error();
    } finally {
      setIsloading(false);
    }
  };

  return {
    isLoading,
    sendingReq,
  };
};

export default useFetch;
