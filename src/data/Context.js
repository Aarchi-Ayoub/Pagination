import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";
// Create the contex
export const Context = createContext();
const Provider = (props) => {
  // The state
  const [count, setCount] = useState(0);

  // Getting the data
  const getData = async () => {
    const rep = await axios.get(
      `https://jsonplaceholder.typicode.com/comments`
    );
    await setCount(rep.data.length);
  };

  // Set the data in the state on loading the page
  useEffect(async () => {
    await getData()
      .then()
      .catch((err) => console.error("Failed Network"));
  }, []);

  return (
    <Context.Provider value={{ count }}> {props.children} </Context.Provider>
  );
};

export default Provider;
