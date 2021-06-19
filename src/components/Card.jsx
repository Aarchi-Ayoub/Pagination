import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card';
import {CardContent} from '@material-ui/core';
import { Typography, Button } from '@material-ui/core';
import { Grid } from '@material-ui/core';
const Cards = ({email, name, body}) => {
    return (
        <Fragment>
             <Grid container item  sm={6} xs={12} lg={3} md={4} >
                <Card  variant="outlined">                 
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {name}
                        </Typography> 
                        <Typography  color="textSecondary">
                            {email}
                        </Typography>
                        <Typography variant="body2" component="p">
                            {body}
                        </Typography>    
                    </CardContent> 
                </Card>
            </Grid>
        </Fragment>
    )
}

export default Cards
