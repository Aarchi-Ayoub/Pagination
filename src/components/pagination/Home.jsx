import React, { Fragment, useContext, useState, useEffect } from "react";

import { Context } from "../../data/Context";
import Comments from "./Comments";
import ReactPaginate from "react-paginate";

import { Container, Typography } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";

import "./Home.css";
import axios from "axios";

const Home = () => {
  // Getting data
  const { count } = useContext(Context);
  // Comments per a page
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(commentsPerPage);

  // Actual page number
  const [pageNumber, setPageNumber] = useState(0);

  // How manu number in paginate
  const pageCount = Math.ceil(count / commentsPerPage);

  // Geting data
  const getData = async (debut = start, fin = 5) => {
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

  // Set the number of comments per a page
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setStart(selected * 5);
    // setStart(selected * 10);
    // setLimit(limit + 5);
  };

  // Set the new data on changing the number of comments per page
  useEffect(async () => {
    await getData(start, commentsPerPage)
      .then((res) => setData(res))
      .catch((err) => console.error("Failed Network"));
  }, [commentsPerPage]);

  // Set the new data on navigate changes
  useEffect(async () => {
    await getData(start, commentsPerPage)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.error("Failed Network"));
  }, [start]);

  // Select box
  const SelectNumber = (title) => (
    <Container>
      <center>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
      </center>
      <FormControl>
        <InputLabel id="demo-customized-select-label">Comments</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={commentsPerPage}
          onChange={(e) => {
            setCommentsPerPage(e.target.value);
          }}
          input={<Input />}
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Container>
  );

  return (
    <Fragment>
      {SelectNumber("React Paginate")}
      <Comments data={data} />
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </Fragment>
  );
};

export default Home;
