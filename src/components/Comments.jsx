import React, { Fragment } from 'react'

import Cards from "./Card";

import { Container, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'
const Comments = ({ data, loading, example }) => { 
  
    return (
        <Fragment>
            <Container  maxWidth="lg">
                <Grid container spacing={3}>
                   {
                    example ? loading ? (<Alert severity="warning">Please wait! Data is loading from our server</Alert>)
                                    :
                                        data && data.map((comment,index)=>(
                                            <Cards key={index} email={comment.email} name={comment.name} body={comment.body} />
                                        ))
                            : data && data.map((comment,index)=>(
                                            <Cards key={index} email={comment.email} name={comment.name} body={comment.body} />
                                        ))
                   }
                </Grid>
            </Container>
        </Fragment>
    )
}
export default Comments;