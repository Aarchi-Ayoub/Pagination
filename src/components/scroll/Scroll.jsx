import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../data/Context";
import Cards from "../Card";

import { Container, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import axios from "axios";
import InfiniteScroll from 'react-infinite-scroll-component';
const Scroll = () => {
  // Getting data
  const { count } = useContext(Context);

  // Comments per a page
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  // State for data
  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(commentsPerPage);

  // Check for data
  const [hasMore, setHasMore] = useState(true);

  // Geting data
  const getData = async (debut = start, fin = limit) => {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/comments?_start=${debut}&_limit=${fin}`
    );
    return res.data;
  };

  // Set the data in the state on loading the page
  useEffect(async () => {
    await getData()
      .then((res) => setData(res))
      .catch((err) => console.error("Failed Network"));
  }, []);

 
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
          <InfiniteScroll
            dataLength={data.length}
            hasMore={hasMore}
            next={()=> {
              if (data.length >= count) {
                setHasMore(false);
                return;
              }
              console.log("Scrolling")
              setStart(start + 5)
              getData(start, limit)
              .then((res) => {
                setData(data.concat(res))
                  console.log("is scrolling");
              })
              .catch((err) => console.error("Failed Network"));
            }}
            loader={<Alert severity="warning">Please wait!</Alert>}
            endMessage={<Alert severity="error">No data to fetch </Alert>}
          >

          {data.length > 0 &&
            data?.map((comment, index) => (
              <Cards
              key={index}
              email={comment.email}
              name={comment.name}
              body={comment.body}
              />
              ))}
          </InfiniteScroll>
      </Grid>
    </Container>
  );
};

export default Scroll;
