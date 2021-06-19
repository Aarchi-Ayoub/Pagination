import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from "react";
// Create the contex
export const Context = createContext();
const Provider = props => {
    // The state
    const [data,setData]= useState([]);
    const [loading, setLoading] = useState(false);
    // Getting the data
    const getData = async ()=>{
        setLoading(true)
        const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setLoading(false)
        return res.data;
    }

    // Set the data in the state on loading the page 
    useEffect( ()=>{
        getData().then(res => setData(res)).catch(err=> console.error("Failed Network"))
    },[]);

    return (
        <Context.Provider value={{ data, loading }}>
            { props.children }
        </Context.Provider>
    )
}

export default Provider
