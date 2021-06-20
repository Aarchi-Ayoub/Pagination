import React, { useContext, useState } from 'react'

import { Context } from '../../data/Context';

import Cards from "../Card";

import { Container, Grid } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert'

import InfiniteScroll from 'react-infinite-scroll-component';
const Scroll = () => {
    // Getting data
    const { data  }  = useContext(Context);
    const [firstIndex, setFirstIndex] = useState(0);
    const [lastIndex, setLastIndex] = useState(20);
    const d = data.slice(firstIndex,lastIndex)
    const [comments, setComments] = useState (d)
    
    const [ hasMore , setHasMore ] = useState(true);
    const fetchMoreData = () => {   
        if (comments.length >= data.length) {
            setHasMore( false );
            return;
        }
        setTimeout(() => {
            setFirstIndex(firstIndex + 20)
            setLastIndex(lastIndex + 20)
            console.log(firstIndex,lastIndex)
            setComments(...comments, data.slice(firstIndex,lastIndex))
            // comments.concat(data.slice(firstIndex,lastIndex))
        }, 1500);
    };
    
    return (
        <Container  maxWidth="lg">
                <Grid container spacing={3}>
                    <InfiniteScroll 
                        dataLength={data.length} 
                        next={fetchMoreData} 
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                    {
                            comments && comments.map((comment,index)=>(
                                <Cards key={index} email={comment.email} name={comment.name} body={comment.body} />
                            ))   
                    }
                   </InfiniteScroll>
                </Grid>
        </Container>
    )
}
    
export default Scroll
