import React, { Fragment, useContext, useState } from 'react'

import { Context } from '../data/Context';
import Comments from './Comments';
import Paginate from './Paginate';
import ReactPaginate from 'react-paginate';

import { Container, Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';


import "./Home.css";

const Home = () => {
    // Getting data
    const { data , loading }  = useContext(Context);
    // Actual page number
    const [pageNumber, setPageNumber] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    // Comments per a page
    const [commentsPerPage, setCommentsPerPage] = useState(12);
    // Page passed 
    const pagesVisited = pageNumber * commentsPerPage;
    // Comments in page
    const comments = data.slice(pagesVisited, pagesVisited + commentsPerPage)
    // Number in paginate 
    const pageCount = Math.ceil(data.length / commentsPerPage);
    // Set the number og comments per a page
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    // Select box
    const SelectNumber = (title)=>(
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
    )
    // Indexs
    const lastIndex = pageNum * commentsPerPage;
    const firstIndex = lastIndex - commentsPerPage;
    const currentIndex = data.slice(firstIndex, lastIndex);
    console.log(lastIndex, firstIndex, currentIndex )
    // Methode
    const paginate = (page)=>{
        setPageNum(page)
        console.log(page)
    }

    return (
        <Fragment>        
            { SelectNumber( "React Paginate" ) } 
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
            <hr/>
            { SelectNumber( "MUI Paginate" ) }
            <Comments data={currentIndex} loading={loading} example={true} />
            <Paginate pageCount={pageCount} paginate={paginate} />
        </Fragment>
    )
}

export default Home
