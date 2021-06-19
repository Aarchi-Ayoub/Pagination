import React, { Fragment } from 'react'
import { Container, Grid } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import Cards from "./Card";
const Comments = ({ data }) => {  
    return (
        <Fragment>
            <Container  maxWidth="lg">
                <Grid container spacing={3}>
                   {
                       data && data.map((comment,index)=>(
                           <Cards key={index} email={comment.email} name={comment.name} body={comment.body} />
                       ))
                   }
                </Grid>
            </Container>
        </Fragment>
    )
}
export default Comments;