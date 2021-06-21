import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../data/Context";
import Cards from "../Card";

import { Container, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

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

  // Scroll down methode
  const fetchMoreData = () => {
    // Have we data or not
    if (data.length >= count) {
      setHasMore(false);
      return;
    }
    // Set the start value
    setTimeout(() => {
      console.log("is scrolling");
      setStart(start + 5);
    }, 500);
  };

  // Set the new data on scrolling down
  useEffect(async () => {
    await getData(start, limit)
      .then((res) => setData(data.concat(res)))
      .catch((err) => console.error("Failed Network"));
  }, [start]);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <InfiniteScroll
          dataLength={count}
          next={fetchMoreData}
          hasMore={hasMore}
          // onScroll={fetchMoreData}
          scrollThreshold={90}
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
