import React, { Fragment } from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { useState } from 'react';

const Paginate = ({pageCount , paginate}) => {
    const [page, setPage ] = useState(1);
    console.log(page)
    const handleChange = async (e, value)=>{
        console.log(value)
        setPage(value)
        await paginate(page)
    }
    return (
        <Fragment>
            <Pagination onChange={ handleChange }  page={page} count={pageCount} color="primary" showFirstButton showLastButton />
        </Fragment>
    )
}

export default Paginate
