import axios from 'axios';
import { useEffect, useState } from 'react';

const useResource = <T,>(
  baseUrl: string
): [
  T[],
  {
    create: (value: T) => Promise<T>;
  }
] => {
  const [resources, setResources] = useState<T[]>([]);

  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => setResources(response.data))
      .catch(e => console.log(e));
  }, [baseUrl]);

  const create = (value: T) => {
    return axios.post(baseUrl, value).then(response => {
      const resource = response.data as T;
      setResources(resources.concat(resource));
      return resource;
    });
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
