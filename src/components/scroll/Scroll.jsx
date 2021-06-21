import React, { useContext, useState, useEffect } from "react";

import { Context } from "../../data/Context";

import Cards from "../Card";

import { Container, Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

import InfiniteScroll from "react-infinite-scroll-component";
const Scroll = () => {
  // Getting data
  const { data } = useContext(Context);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(20);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    if (data.length > 0) {
      setComments(data.slice(firstIndex, lastIndex));
    }
  }, [data]);
  console.log(comments);
  const fetchMoreData = () => {
    if (comments.length >= data.length) {
      setHasMore(false);
      return;
    }
    setFirstIndex(firstIndex + 20);
    setLastIndex(lastIndex + 20);
    console.log(firstIndex, lastIndex);
    setTimeout(() => {
      setComments(comments.concat(data.slice(firstIndex, lastIndex)));
    }, 500);
  };
  console.log(firstIndex, lastIndex);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <InfiniteScroll
          dataLength={data.length}
          next={() => fetchMoreData()}
          hasMore={hasMore}
          loader={
            <Alert severity="warning">
              Please wait! Data is loading from our server
            </Alert>
          }
          endMessage={<Alert severity="error">No data to fetch </Alert>}
        >
          {comments.length > 0 &&
            comments?.map((comment, index) => (
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
