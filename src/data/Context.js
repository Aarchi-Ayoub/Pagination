import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
// Create the contex
export const Context = createContext();
const Provider = (props) => {
  // The state
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);

  // Getting the data
  const getData = async () => {
    setLoading(true);
    const rep = await axios.get(
      `https://jsonplaceholder.typicode.com/comments`
    );
    setCount(rep.data.length);
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_start=${start}&_end=${limit}`
    );
    setLoading(false);
    return res.data;
  };

  // Set the data in the state on loading the page
  useEffect(async () => {
    await getData()
      .then((res) => setData(res))
      .catch((err) => console.error("Failed Network"));
  }, []);

  return (
    <Context.Provider
      value={{ data, count, loading, start, setStart, limit, setLimit }}
    >
      {" "}
      {props.children}{" "}
    </Context.Provider>
  );
};

export default Provider;
