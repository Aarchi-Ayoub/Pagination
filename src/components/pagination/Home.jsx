import React, { Fragment, useContext, useState, useEffect } from "react";

import { Context } from "../../data/Context";
import Comments from "./Comments";
import Paginate from "./Paginate";
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
  const { count, loading } = useContext(Context);

  const [data, setData] = useState([]);
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(5);

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

  // Actual page number
  const [pageNumber, setPageNumber] = useState(0);
  const [pageNum, setPageNum] = useState(1);

  // Comments per a page
  const [commentsPerPage, setCommentsPerPage] = useState(5);

  // Page passed
  const pagesVisited = pageNumber * commentsPerPage;

  // Comments in page
  const comments = data.slice(pagesVisited, pagesVisited + commentsPerPage);

  // Number in paginate
  const pageCount = Math.ceil(count / commentsPerPage);

  // Set the number og comments per a page
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    setStart(selected * 5);
    // setStart(selected * 10);
    // setLimit(limit + 5);
  };
  useEffect(async () => {
    await getData(start, limit)
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
          onChange={(e) => setCommentsPerPage(e.target.value)}
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

  // Indexs
  const lastIndex = pageNum * commentsPerPage;
  const firstIndex = lastIndex - commentsPerPage;

  // Methode
  // const paginate = (page) => {
  //   setPageNum(page + 1);
  //   console.log(page);
  // };

  return (
    <Fragment>
      {SelectNumber("React Paginate")}
      <Comments data={comments} />
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
      <hr />
      {/* {SelectNumber("MUI Paginate")}
      <Comments data={currentIndex} loading={loading} example={true} /> */}
      {/* <Paginate pageCount={pageCount} paginate={paginate} /> */}
    </Fragment>
  );
};

export default Home;
