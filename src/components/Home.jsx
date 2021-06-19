import React, { Fragment, useContext, useState } from 'react'
import { Context } from '../data/Context';
import Comments from './Comments';
import ReactPaginate from 'react-paginate';
import { Container, Grid } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import "./Home.css";
const Home = () => {
    const data  = useContext(Context);
    const [pageNumber, setPageNumber] = useState(0);
    const [commentsPerPage, setCommentsPerPage] = useState(12);
    const pagesVisited = pageNumber * commentsPerPage;
    const comments = data.slice(pagesVisited, pagesVisited + commentsPerPage)
    const pageCount = Math.ceil(data.length / commentsPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
      <Fragment>
            <Container>
                <FormControl>
                    <InputLabel id="demo-customized-select-label">Comments</InputLabel>
                    <Select
                        labelId="demo-customized-select-label"
                        id="demo-customized-select"
                        value={commentsPerPage}
                        onChange={(e)=>setCommentsPerPage(e.target.value)}
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
          <Comments data={comments}  />
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
    )
}

export default Home
