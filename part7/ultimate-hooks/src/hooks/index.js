import { useState, useEffect } from "react";
import axios from "axios";

export const useResource = (baseUrl) => {
  const [trigger, setTrigger] = useState([]);
  const [resources, setResources] = useState([]);
  useEffect(() => {
    axios.get(baseUrl).then((response) => setResources(response.data));
  }, [baseUrl, trigger]);

  const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject);
    setTrigger(response)
    return response.data;
  };

  const service = {
    create,
  };

  return [resources, service];
};
