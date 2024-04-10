import axios from "axios";
import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loadingTime , setLoadingTime]=useState(true)

  useEffect(() => {
    axios.get(url).then
    (data => {
      setData(data.data)  
      setLoadingTime(false)
    })

  }, [url]);

  return [data , loadingTime];
};

export default useFetch;